"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { backendApi } from "../../lib/api";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

// --- Types ---
type Project = { _id: string; name: string };
type SubmissionData = {
  ownerName: string;
  driverName: string;
  projectName: string;
  startKm: string;
  endKm: string;
  pickupPoint: string;
  dropPoint: string;
  employeeName: string;
  teamHead: string;
  totalKm: number;
};

type SubmissionDetailsPopupProps = {
  data: SubmissionData;
  onClose: () => void;
};

const DEFAULT_PROJECTS: Project[] = [
  { _id: "1", name: "Urbainia Trinity NX" },
  { _id: "2", name: "Migsun Rohini Central" },
  { _id: "3", name: "KW Blue Pearl" },
  { _id: "4", name: "KW Delhi-6" },
  { _id: "5", name: "Eco Village Cottage & Resort" },
  { _id: "6", name: "Sui generis Residenncy" },
  { _id: "7", name: "Sky Harbor" },
  { _id: "8", name: "The Adriatico" },
  { _id: "9", name: "Sun Rise" },
  { _id: "10", name: "Sai Kunj" },
];

const SubmissionDetailsPopup: React.FC<SubmissionDetailsPopupProps> = ({ data, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 mx-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Booking Submitted Successfully</h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Cab Owner:</span>
            <span>{data.ownerName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Driver Name:</span>
            <span>{data.driverName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Project(s):</span>
            <span>{data.projectName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Team Head:</span>
            <span>{data.teamHead}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Distance:</span>
            <span>{data.totalKm} km</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Pickup Point:</span>
            <span>{data.pickupPoint}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Drop Point:</span>
            <span>{data.dropPoint}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Employee Name:</span>
            <span>{data.employeeName}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

type CabVendorFormProps = {
  onClose?: () => void;
};

const CabVendorForm: React.FC<CabVendorFormProps> = ({ onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ownerName: "",
    driverName: "",
    projectName: [] as string[],
    startKm: "",
    endKm: "",
    pickupPoint: "",
    dropPoint: "",
    employeeName: "",
    teamHead: "",
  });
  const [totalKm, setTotalKm] = useState<number | string>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmissionData | null>(null);

  const teamHeads = [
    "Mr. Awadhesh Kumar",
    "Mr. Shiva Karki",
    "Mr. Sartaj Ali",
    "Ms. Pooja",
    "Mr. Raghunandan Kumar",
    "Mr. Rahul Singh Parihar",
    "Mr. Shivam Tripathi",
    "Mr. Santosh Kumar Singh",
    "Mr. Nitin Kumar Sharma",
    "Mr. Pankaj Mohapatra",
    "Mr. Dinesh Kumar Diwakar",
    "Mr. Biraj Kumar Byapari",
    "Mr. S.S. Dwivedi",
    "Mr. Sujeet Mehta",
    "Mr. Deepak Kumar",
    "Mohd. Kaleem",
    "Mr. Manish Kumar",
    "Mr. Rajendra Chauhan",
    "Mr. Subodh Khantwal",
    "Mr. Arun Kumar",
    "Inrext Pvt. Ltd."
  ];

  useEffect(() => {
    if (formData.startKm && formData.endKm) {
      const start = parseFloat(formData.startKm);
      const end = parseFloat(formData.endKm);
      if (!isNaN(start) && !isNaN(end) && end >= start) {
        setTotalKm((end - start).toFixed(2));
      } else {
        setTotalKm(0);
      }
    } else {
      setTotalKm(0);
    }
  }, [formData.startKm, formData.endKm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectChange = (projectName: string) => {
    setFormData(prev => {
      if (prev.projectName.includes(projectName)) {
        return {
          ...prev,
          projectName: prev.projectName.filter(name => name !== projectName)
        };
      } else {
        return {
          ...prev,
          projectName: [...prev.projectName, projectName]
        };
      }
    });
  };

  const handleSelectAllProjects = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        projectName: DEFAULT_PROJECTS.map(project => project.name)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        projectName: []
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.projectName.length === 0) {
      setError("Please select at least one project");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Create a booking for each selected project
      const bookings = formData.projectName.map(project => ({
        ...formData,
        projectName: project,
        totalKm: parseFloat(totalKm as string)
      }));

      await Promise.all(
        bookings.map(booking => backendApi.post('/api/v1/vendor-bookings', booking))
      );

      setSubmittedData({
        ...formData,
        projectName: formData.projectName.join(", "),
        totalKm: parseFloat(totalKm as string)
      });
      setShowSuccessPopup(true);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit vendor booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="fixed inset-0 bg-black/50" onClick={onClose || (() => router.back())}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 mx-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={onClose || (() => router.back())}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            >
              <MdClose className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Cab Vendor Details</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cab Owner Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Cab Owner Name*
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {/* Driver Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Driver Name*
                  </label>
                  <input
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {/* Project Name - Checkbox Implementation */}
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Project Name(s)*
                  </label>
                  <div className="border border-gray-300 rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="select-all-projects"
                        checked={formData.projectName.length === DEFAULT_PROJECTS.length}
                        onChange={handleSelectAllProjects}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="select-all-projects"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Select All Projects
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEFAULT_PROJECTS.map((project) => (
                        <div key={project._id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`project-${project._id}`}
                            checked={formData.projectName.includes(project.name)}
                            onChange={() => handleProjectChange(project.name)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`project-${project._id}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {project.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {formData.projectName.length === 0 && (
                    <p className="mt-1 text-xs text-red-500">Please select at least one project</p>
                  )}
                  {formData.projectName.length > 0 && (
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.projectName.length} project(s) selected
                    </p>
                  )}
                </div>
                {/* Team Head */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Team Head*
                  </label>
                  <select
                    name="teamHead"
                    value={formData.teamHead}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Team Head</option>
                    {teamHeads.map(head => (
                      <option key={head} value={head}>{head}</option>
                    ))}
                  </select>
                </div>
                {/* Start KM */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Start Kilometers*
                  </label>
                  <input
                    type="number"
                    name="startKm"
                    value={formData.startKm}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {/* End KM */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    End Kilometers*
                  </label>
                  <input
                    type="number"
                    name="endKm"
                    value={formData.endKm}
                    onChange={handleChange}
                    required
                    min={formData.startKm || 0}
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {/* Total KM Display */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Total Kilometers
                  </label>
                  <div className="p-2 bg-gray-100 rounded-md">
                    <p className="font-medium">{totalKm} km</p>
                  </div>
                </div>
                {/* Pickup Point */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Pickup Point*
                  </label>
                  <input
                    type="text"
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {/* Drop Point */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Drop Point*
                  </label>
                  <input
                    type="text"
                    name="dropPoint"
                    value={formData.dropPoint}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {/* Employee Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Employee Name*
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose || (() => router.back())}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccessPopup && submittedData && (
        <SubmissionDetailsPopup
          data={submittedData}
          onClose={handleSuccessPopupClose}
        />
      )}
    </>
  );
};

export default CabVendorForm;
