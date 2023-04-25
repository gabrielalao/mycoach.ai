const postConverter = {
  toFirestore(data) {
      return {
          ...data
      }
  },
  fromFirestore(snapshot, options) {
      const data = snapshot.data(options)
      return {
          id: snapshot.id,
          ...data
      }
  },
};

export default postConverter