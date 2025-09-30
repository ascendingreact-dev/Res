/* 
import organizationModel from '../model/organizationModel.js';

const planCheckMiddleware = async (req, res, next) => {
  try {
    const orgId = req.user?.org_id || req.body?.org_id || req.params?.org_id;
    const org = await organizationModel.findById(orgId);
    if (!org) return res.status(404).json({ message: "Organization not found" });

    const now = new Date();
    const isExpired = new Date(org.validto) < now;

    if (isExpired || org.isPlanExpired) {
      if (!org.isPlanExpired) {
        org.isPlanExpired = true;
        await org.save();
      }
      return res.status(403).json({ message: "Access denied. Plan expired." });
    }

    next();
  } catch (err) {
    console.error("Plan middleware error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default planCheckMiddleware;
 */

import organizationModel from '../model/organizationModel.js';

const planCheckMiddleware = async (req, res, next) => {
  try {
    const orgId = req.user?.org_id || req.body?.org_id || req.params?.org_id;

    if (!orgId) {
      const error = new Error("org_id is missing");
      error.error = error.message;
      error.statuscode = 400;
      return next(error);
    }

    const org = await organizationModel.findById(orgId);
    if (!org) {
      const error = new Error("Organization not found");
      error.error = error.message;
      error.statuscode = 404;
      return next(error);
    }

    const now = new Date();
    const isExpired = new Date(org.validto) < now;

    if (isExpired || org.isPlanExpired) {
      if (!org.isPlanExpired) {
        org.isPlanExpired = true;
        await org.save();
      }

      const error = new Error("Access denied. Plan expired.");
      error.error = error.message;
      error.statuscode = 403;
      return next(error);
    }

    next();
  } catch (err) {
    err.error = err.message;
    err.statuscode = 500;
    console.error("Plan middleware error:", err);
    next(err);
  }
};

export default planCheckMiddleware;
