import {
  Schema,
  model,
  PopulatedDoc,
  PaginateModel,
  Types,
  Document,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from "validator";
import { Interface_Event } from "./Event";
import { Interface_MembershipRequest } from "./MembershipRequest";
import { Interface_Organization } from "./Organization";
/**
 * This is an interface that represents a database(MongoDB) document for User.
 */
export interface Interface_User {
  _id: Types.ObjectId;
  image: string | undefined | null;
  token: string | undefined;
  tokenVersion: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  appLanguageCode: string;
  createdOrganizations: Array<PopulatedDoc<Interface_Organization & Document>>;
  createdEvents: Array<PopulatedDoc<Interface_Event & Document>>;
  userType: string;
  joinedOrganizations: Array<PopulatedDoc<Interface_Organization & Document>>;
  registeredEvents: Array<PopulatedDoc<Interface_Event & Document>>;
  eventAdmin: Array<PopulatedDoc<Interface_Event & Document>>;
  adminFor: Array<PopulatedDoc<Interface_Organization & Document>>;
  membershipRequests: Array<
    PopulatedDoc<Interface_MembershipRequest & Document>
  >;
  organizationsBlockedBy: Array<
    PopulatedDoc<Interface_Organization & Document>
  >;
  status: string;
  organizationUserBelongsTo:
    | PopulatedDoc<Interface_Organization & Document>
    | undefined;
  pluginCreationAllowed: boolean;
  adminApproved: boolean;
  createdAt: Date;
}
/**
 * This describes the schema for a `User` that corresponds to `Interface_User` document.
 * @param image - User Image URL.
 * @param tokenVersion - Token version.
 * @param firstName - User First Name.
 * @param token - Access token.
 * @param lastName - User Last Name.
 * @param email - User email id.
 * @param password - User hashed password.
 * @param appLanguageCode - User's app language code.
 * @param createdOrganizations - Collection of all organization created by the user, each object refer to `Organization` model.
 * @param createdEvents - Collection of all events created by the user, each object refer to `Event` model.
 * @param userType - User type.
 * @param joinedOrganizations - Collection of the organization where user is the member, each object refer to `Organization` model.
 * @param registeredEvents - Collection of user registered Events, each object refer to `Event` model.
 * @param eventAdmin - Collection of the event admins, each object refer to `Event` model.
 * @param adminFor - Collection of organization where user is admin, each object refer to `Organization` model.
 * @param membershipRequests - Collections of the membership request, each object refer to `MembershipRequest` model.
 * @param organizationsBlockedBy - Collections of organizations where user is blocked, each object refer to `Organization` model.
 * @param status - Status
 * @param organizationUserBelongsTo - Organization where user belongs to currently.
 * @param pluginCreationAllowed - Wheather user is allowed to create plugins.
 * @param adminApproved - Wheather user is admin approved.
 * @param createdAt - Time stamp of data creation.
 */
const userSchema = new Schema({
  image: {
    type: String,
  },
  token: {
    type: String,
    required: false,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: true,
  },
  appLanguageCode: {
    type: String,
    required: true,
    default: "en",
  },
  createdOrganizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  userType: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN", "SUPERADMIN"],
    default: "USER",
  },
  joinedOrganizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  registeredEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  eventAdmin: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  adminFor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  membershipRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "MembershipRequest",
    },
  ],
  organizationsBlockedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "BLOCKED", "DELETED"],
    default: "ACTIVE",
  },
  organizationUserBelongsTo: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  pluginCreationAllowed: {
    type: Boolean,
    required: true,
    default: true,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(mongoosePaginate);

const UserModel = () =>
  model<Interface_User, PaginateModel<Interface_User>>("User", userSchema);

// This syntax is needed to prevent Mongoose OverwriteModelError while running tests.
export const User = (models.User || UserModel()) as ReturnType<
  typeof UserModel
>;
