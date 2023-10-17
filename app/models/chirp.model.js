module.exports = mongoose => {
    const Chirp = mongoose.model(
      "chirp",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Chirp;
  };