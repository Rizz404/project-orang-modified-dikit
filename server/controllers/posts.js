import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // membuat post baru
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    // dan menampilkannya
    const post = await Post.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // menampilkan semua postingan
    const post = await Post.find();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // menampilkan postingan orang secara spesifik
    const { userId } = req.params;
    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const likePosts = async (req, res) => {
  try {
    // menampilkan jumlah like postingan
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // kalau postnya sudah dilike oleh diri sendiri maka like dihapus
      post.likes.delete(userId);
    } else {
      // jika belum maka like postnya
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
