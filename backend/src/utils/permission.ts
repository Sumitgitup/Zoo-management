export const PERMISSIONS = {
  // Animal Management
  ANIMALS_VIEW: "animals:view",
  ANIMALS_CREATE: "animals:create",
  ANIMALS_UPDATE: "animals:update",
  ANIMALS_DELETE: "animals:delete",

  // Medical Records
  MEDICAL_VIEW: "medical:view",
  MEDICAL_CREATE: "medical:create",
  MEDICAL_UPDATE: "medical:update",

  // Visitor Management
  VISITORS_VIEW: "visitors:view",
  VISITORS_CREATE: "visitors:create",
  VISITORS_UPDATE: "visitors:update",
  VISITORS_DELETE: "visitors:delete",

  // Ticket Management
  TICKETS_VIEW: "tickets:view",
  TICKETS_CREATE: "tickets:create",
  TICKETS_UPDATE: "tickets:update",
  TICKETS_DELETE: "tickets:delete",

  // Work Orders
  WORKORDERS_VIEW: "workorders:view",
  WORKORDERS_CREATE: "workorders:create",
  WORKORDERS_UPDATE: "workorders:update",
  WORKORDERS_ASSIGN: "workorders:assign",

  // Staff Management
  STAFF_VIEW: "staff:view",
  STAFF_CREATE: "staff:create",
  STAFF_UPDATE: "staff:update",
  STAFF_DELETE: "staff:delete",

  // Reports
  REPORTS_VIEW: "reports:view",
  REPORTS_GENERATE: "reports:generate",

  // System Settings
  SETTINGS_VIEW: "settings:view",
  SETTINGS_UPDATE: "settings:update",
};

export const ROLES = {
  ADMIN: "Admin",
  VETERINARIAN: "Veterinarian",
  CARETAKER: "Caretaker",
  VOLUNTEER: "Volunteer",
  RECEPTIONIST: "Receptionist",
};

// Default permissions for each role
export function getDefaultPermissions(role: string): string[] {
  switch (role) {
    case ROLES.ADMIN:
      return Object.values(PERMISSIONS); // All permissions

    case ROLES.VETERINARIAN:
      return [
        PERMISSIONS.ANIMALS_VIEW,
        PERMISSIONS.ANIMALS_UPDATE,
        PERMISSIONS.MEDICAL_VIEW,
        PERMISSIONS.MEDICAL_CREATE,
        PERMISSIONS.MEDICAL_UPDATE,
        PERMISSIONS.WORKORDERS_VIEW,
        PERMISSIONS.WORKORDERS_CREATE,
        PERMISSIONS.WORKORDERS_UPDATE,
        PERMISSIONS.REPORTS_VIEW,
      ];

    case ROLES.CARETAKER:
      return [
        PERMISSIONS.ANIMALS_VIEW,
        PERMISSIONS.ANIMALS_UPDATE,
        PERMISSIONS.WORKORDERS_VIEW,
        PERMISSIONS.WORKORDERS_CREATE,
        PERMISSIONS.WORKORDERS_UPDATE,
        PERMISSIONS.VISITORS_VIEW,
      ];

    case ROLES.RECEPTIONIST:
      return [
        PERMISSIONS.VISITORS_VIEW,
        PERMISSIONS.VISITORS_CREATE,
        PERMISSIONS.VISITORS_UPDATE,
        PERMISSIONS.TICKETS_VIEW,
        PERMISSIONS.TICKETS_CREATE,
        PERMISSIONS.TICKETS_UPDATE,
        PERMISSIONS.ANIMALS_VIEW,
      ];

    case ROLES.VOLUNTEER:
      return [
        PERMISSIONS.ANIMALS_VIEW,
        PERMISSIONS.VISITORS_VIEW,
        PERMISSIONS.TICKETS_VIEW,
      ];

    default:
      return [];
  }
}
