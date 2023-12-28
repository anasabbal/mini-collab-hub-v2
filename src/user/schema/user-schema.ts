import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { Role } from "src/enums/role.enums";



const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
}

export class User extends mongoose.Document {
  [x: string]: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  getEncryptedPassword: (password: string) => Promise<string>;

  async compareEncryptedPassword(password: string): Promise<boolean> {
    const isMatch = bcrypt.compare(password, this.password);
    console.log(isMatch);
    return isMatch;
  }
}

export const UserSchema = new mongoose.Schema<User>(
  {

    firstName: {
      type: String,
      required: [true, 'First Name can not be empty !']
    },
    lastName: {
      type: String,
      required: [true, 'Last Name can not be empty !']
    },
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email should be valid',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      minlength: [6, 'Password should include at least 6 chars'],
    },
    roles: {
      type: Array<Role>,
      default: Role.USER
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);

UserSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});
