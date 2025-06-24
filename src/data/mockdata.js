export const mockApplications = [
  {
    // Basic info - shown in list view
    id: 'AAP-001',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    initials: 'JD',
    status: 'Approved',
    appliedDate: '2025-06-11',
    
    // Detailed info - shown in detail panel
    customerDetails: {
      dateOfBirth: '01/12/1995',
      email: 'jhondoe@gmail.com', // Note: different from list email as per your image
      phone: '+91-4232793489',
      address: '126 Main Street, Bengaluru Karnataka',
      ssn: '123456997'
    },
    applicationStatus: {
      status: 'Approved',
      offerId: '43545334',
      idkStatus: 'Completed',
      status12C: 'Active',
      apr: '10.99%',
      creditLine: '$5000'
    }
  },
  {
    id: 'AAP-002',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    initials: 'SJ',
    status: 'Pending',
    appliedDate: '2025-06-10',
    
    customerDetails: {
      dateOfBirth: '15/08/1992',
      email: 'sarah.johnson@gmail.com',
      phone: '+91-9876543210',
      address: '45 Brigade Road, Bengaluru Karnataka',
      ssn: '987654234'
    },
    applicationStatus: {
      status: 'Pending',
      offerId: '43545335',
      idkStatus: 'In Progress',
      status12C: 'Pending',
      apr: 'TBD',
      creditLine: 'TBD'
    }
  },
  {
    id: 'AAP-003',
    fullName: 'Michael Chen',
    email: 'mchen@outlook.com',
    initials: 'MC',
    status: 'Approved',
    appliedDate: '2025-06-09',
    
    customerDetails: {
      dateOfBirth: '22/03/1988',
      email: 'mchen@outlook.com',
      phone: '+91-8765432109',
      address: '78 MG Road, Bengaluru Karnataka',
      ssn: '456789456'
    },
    applicationStatus: {
      status: 'Approved',
      offerId: '43545336',
      idkStatus: 'Completed',
      status12C: 'Active',
      apr: '9.75%',
      creditLine: '$7500'
    }
  },
  {
    id: 'AAP-004',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@yahoo.com',
    initials: 'PS',
    status: 'Rejected',
    appliedDate: '2025-06-08',
    
    customerDetails: {
      dateOfBirth: '10/11/1990',
      email: 'priya.sharma@yahoo.com',
      phone: '+91-7654321098',
      address: '23 Koramangala, Bengaluru Karnataka',
      ssn: '321098789'
    },
    applicationStatus: {
      status: 'Rejected',
      offerId: '43545337',
      idkStatus: 'Failed',
      status12C: 'Inactive',
      apr: 'N/A',
      creditLine: 'N/A'
    }
  },
  {
    id: 'AAP-006',
    fullName: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    initials: 'LA',
    status: 'Approved',
    appliedDate: '2025-06-06',
    
    customerDetails: {
      dateOfBirth: '18/04/1993',
      email: 'lisa.anderson@email.com',
      phone: '+91-5432109876',
      address: '89 Whitefield, Bengaluru Karnataka',
      ssn: '789012654'
    },
    applicationStatus: {
      status: 'Approved',
      offerId: '43545339',
      idkStatus: 'Completed',
      status12C: 'Active',
      apr: '11.25%',
      creditLine: '$4500'
    }
  },
  {
    id: 'AAP-007',
    fullName: 'Robert Taylor',
    email: 'rtaylor@domain.com',
    initials: 'RT',
    status: 'Pending',
    appliedDate: '2025-06-05',
    
    customerDetails: {
      dateOfBirth: '28/09/1987',
      email: 'rtaylor@domain.com',
      phone: '+91-4321098765',
      address: '12 Electronic City, Bengaluru Karnataka',
      ssn: '234567987'
    },
    applicationStatus: {
      status: 'Pending',
      offerId: '43545340',
      idkStatus: 'Verification',
      status12C: 'Pending',
      apr: 'TBD',
      creditLine: 'TBD'
    }
  },
  {
    id: 'AAP-008',
    fullName: 'Amanda Rodriguez',
    email: 'amanda.r@service.com',
    initials: 'AR',
    status: 'Approved',
    appliedDate: '2025-06-04',
    
    customerDetails: {
      dateOfBirth: '14/06/1991',
      email: 'amanda.r@service.com',
      phone: '+91-3210987654',
      address: '34 HSR Layout, Bengaluru Karnataka',
      ssn: '567890123'
    },
    applicationStatus: {
      status: 'Approved',
      offerId: '43545341',
      idkStatus: 'Completed',
      status12C: 'Active',
      apr: '8.90%',
      creditLine: '$8000'
    }
  },
  {
    id: 'AAP-009',
    fullName: 'Kevin Brown',
    email: 'kbrown@mail.com',
    initials: 'KB',
    status: 'Rejected',
    appliedDate: '2025-06-03',
    
    customerDetails: {
      dateOfBirth: '02/01/1989',
      email: 'kbrown@mail.com',
      phone: '+91-2109876543',
      address: '56 Jayanagar, Bengaluru Karnataka',
      ssn: '890123567'
    },
    applicationStatus: {
      status: 'Rejected',
      offerId: '43545342',
      idkStatus: 'Failed',
      status12C: 'Inactive',
      apr: 'N/A',
      creditLine: 'N/A'
    }
  },
  {
    id: 'AAP-011',
    fullName: 'Christopher Davis',
    email: 'cdavis@example.org',
    initials: 'CD',
    status: 'Approved',
    appliedDate: '2025-06-01',
    
    customerDetails: {
      dateOfBirth: '11/05/1986',
      email: 'cdavis@example.org',
      phone: '+91-0987654321',
      address: '90 Banashankari, Bengaluru Karnataka',
      ssn: '678901345'
    },
    applicationStatus: {
      status: 'Approved',
      offerId: '43545344',
      idkStatus: 'Completed',
      status12C: 'Active',
      apr: '13.45%',
      creditLine: '$2500'
    }
  },
  {
    id: 'AAP-012',
    fullName: 'Michelle Garcia',
    email: 'mgarcia@webmail.com',
    initials: 'MG',
    status: 'Pending',
    appliedDate: '2025-05-31',
    
    customerDetails: {
      dateOfBirth: '07/10/1992',
      email: 'mgarcia@webmail.com',
      phone: '+91-9876543021',
      address: '15 Rajajinagar, Bengaluru Karnataka',
      ssn: '901234678'
    },
    applicationStatus: {
      status: 'Pending',
      offerId: '43545345',
      idkStatus: 'Initial Review',
      status12C: 'Pending',
      apr: 'TBD',
      creditLine: 'TBD'
    }
  }
];