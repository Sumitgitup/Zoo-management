import serverConfig from "../config/server-config";
import Staff from "../models/staff.model";
import bcrypt from "bcrypt";
import logger from "./logger";

export async function seedAdminUser() {
  try {
    console.log("Fuction get called");

    const adminExists = await Staff.findOne({ role: "Admin" });

    console.log(adminExists);

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(
        serverConfig.ADMIN_PASSWORD!,
        10
      );

      await Staff.create({
        employeeId: "Admin",
        firstName: "Admin",
        lastName: "Kumar",
        email: "admin123@gmail.com",
        password: hashedPassword,
        role: "Admin",
        phone: "1234567890",
        department: "*",
        isActive: true,
        hireDate: new Date(),
        permissions: ["Admin"],
        shift: {
          startTime: "Admin only chill",
          endTime: "Admin only chill",
          workDays: "All Day chill",
        },
        emergencyContact: {
          name: "Admin",
          phone: "1234567890",
          relationship: "Admin hi hu",
        },
      });

      console.log("Admin user created: admin/admin123");
    }
  } catch (error) {
    logger.error("Error while Admin seed", error);
  }
}
