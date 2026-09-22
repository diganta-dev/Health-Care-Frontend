const prefix = "/patient";
export const patientRoutes = [
  {
    title: "Management",

    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Appointments",
        url: `${prefix}/appointments`,
      },
      {
        title: "Book Appointment",
        url: `${prefix}/book`,
      },
    ],
  },
  {
    title: "Application Management",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
      {
        title: "Rendering",
        url: "#",
      },
      {
        title: "Caching",
        url: "#",
      },
    ],
  },
];
