import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    // selalu ingat type data ditulis menggunakan kapital contoh: String
    firstName: {
      type: String,
      required: true,
      min: 2, // menentukan max dan min dari collection firstname
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true, // menjadikannya tidak boleh sama dengan yang lain
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    // kalau atributnya cuma satu maka seperti ini saja
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number,
  },
  { timestamps: true } // menggunakan timestamp
);

// menerima dua parameter yang pertama nama collectionnya dan kedua adalah schemanya
export default mongoose.model("Users", UserSchema);
