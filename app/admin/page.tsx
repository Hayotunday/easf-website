"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ApplicationData } from "@/types/application-types";

interface ApplicationWithId extends ApplicationData {
  id: string;
  createdAt?: string;
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function AdminApplicationsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [applications, setApplications] = useState<ApplicationWithId[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationWithId[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<ApplicationWithId | null>(
    null,
  );
  const [showDetail, setShowDetail] = useState(false);

  // Filters
  const [programFilter, setProgramFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get unique programs
  const programs = Array.from(
    new Set(applications.map((app) => app.program).filter(Boolean)),
  ).sort();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError(null);
      fetchApplications();
    } else {
      setError("Invalid password");
      setPassword("");
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || "Failed to fetch applications");
      }

      setApplications(json.applications);
      setFilteredApplications(json.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = applications;

    if (programFilter) {
      filtered = filtered.filter((app) => app.program === programFilter);
    }

    if (statusFilter !== "all") {
      // You can implement status logic here based on your needs
      // For now, assuming "all" is the only status
    }

    if (startDate) {
      const start = new Date(startDate).getTime();
      filtered = filtered.filter((app) => {
        const appDate = app.createdAt ? new Date(app.createdAt).getTime() : 0;
        return appDate >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate).getTime();
      filtered = filtered.filter((app) => {
        const appDate = app.createdAt ? new Date(app.createdAt).getTime() : 0;
        return appDate <= end;
      });
    }

    setFilteredApplications(filtered);
  }, [applications, programFilter, startDate, endDate, statusFilter]);

  const downloadCSV = () => {
    if (filteredApplications.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Date of Birth",
      "Gender",
      "Address",
      "Nationality",
      "Program",
      "Study Mode",
      "Course of Study",
      "Institution",
      "Previous School",
      "O-Level Grade",
      "Intended Graduation",
      "Passport Photo",
      "Academic Results",
      "Essays",
    ];

    const rows = filteredApplications.map((app) => [
      app.id,
      app.fullName,
      app.email,
      app.phone,
      app.dateOfBirth,
      app.gender,
      app.address,
      app.nationality,
      app.program,
      app.studyMode,
      app.courseOfStudy,
      app.institution,
      app.previousSchool,
      app.olevelGrade,
      app.intendedGraduation,
      app.passportPhoto ? "Yes" : "No",
      app.academicResults ? "Yes" : "No",
      app.essays?.join("; ") || "",
    ]);

    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadExcel = async () => {
    if (filteredApplications.length === 0) return;

    try {
      const response = await fetch("/api/admin/applications/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredApplications),
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `applications-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleAuth}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full"
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-8">Loading applications...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Total: {applications.length} | Filtered:{" "}
              {filteredApplications.length}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setAuthenticated(false);
              setApplications([]);
              setPassword("");
            }}
          >
            Logout
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program
              </label>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Programs</option>
                {programs.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mb-6 flex gap-2">
          <Button
            onClick={downloadCSV}
            disabled={filteredApplications.length === 0}
          >
            Download CSV
          </Button>
          <Button
            onClick={downloadExcel}
            disabled={filteredApplications.length === 0}
          >
            Download Excel
          </Button>
        </div>

        {/* Table */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">No applications found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Program
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Course
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Institution
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{app.fullName}</td>
                      <td className="px-4 py-3 text-sm">{app.email}</td>
                      <td className="px-4 py-3 text-sm">{app.program}</td>
                      <td className="px-4 py-3 text-sm">{app.courseOfStudy}</td>
                      <td className="px-4 py-3 text-sm">{app.institution}</td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedApp(app);
                            setShowDetail(true);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetail && selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-100 border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Application Details</h2>
                <button
                  onClick={() => setShowDetail(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <p className="text-gray-900">{selectedApp.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Date of Birth
                    </label>
                    <p className="text-gray-900">{selectedApp.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Gender
                    </label>
                    <p className="text-gray-900">{selectedApp.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Nationality
                    </label>
                    <p className="text-gray-900">{selectedApp.nationality}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-3">
                    Address Information
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Address
                    </label>
                    <p className="text-gray-900">{selectedApp.address}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-3">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Program
                      </label>
                      <p className="text-gray-900">{selectedApp.program}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Study Mode
                      </label>
                      <p className="text-gray-900">{selectedApp.studyMode}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Course of Study
                      </label>
                      <p className="text-gray-900">
                        {selectedApp.courseOfStudy}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Institution
                      </label>
                      <p className="text-gray-900">{selectedApp.institution}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Previous School
                      </label>
                      <p className="text-gray-900">
                        {selectedApp.previousSchool}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        O-Level Grade
                      </label>
                      <p className="text-gray-900">{selectedApp.olevelGrade}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Intended Graduation
                      </label>
                      <p className="text-gray-900">
                        {selectedApp.intendedGraduation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-3">Essays</h3>
                  <div className="space-y-4">
                    {selectedApp.essays?.map((essay, index) => (
                      <div key={index}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Question {index + 1}
                        </label>
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {essay}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-3">
                    Document Uploads
                  </h3>
                  <div>
                    <p className="text-sm">
                      <strong>Passport Photo:</strong>{" "}
                      {selectedApp.passportPhoto
                        ? "✓ Uploaded"
                        : "✗ Not uploaded"}
                    </p>
                    <p className="text-sm">
                      <strong>Academic Results:</strong>{" "}
                      {selectedApp.academicResults
                        ? "✓ Uploaded"
                        : "✗ Not uploaded"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 border-t px-6 py-4 flex justify-end">
                <Button onClick={() => setShowDetail(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
