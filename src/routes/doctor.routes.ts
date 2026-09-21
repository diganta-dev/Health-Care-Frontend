const prefix = "/doctor"
export const doctorRoutes = [
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
          title: "Schedule",
          url: `${prefix}/schedule`,
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
    
  ]