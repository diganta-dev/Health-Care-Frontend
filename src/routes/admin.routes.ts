const prefix = "/admin"
export const adminRoutes = [
    {
      title: "Management",
     
      items: [
        {
          title: "Overview",
          url: `${prefix}`,
        },
        {
          title: "Doctor Appruval",
          url: `${prefix}/approve-doctor`,
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