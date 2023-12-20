import React, { useState,useEffect } from 'react';
import { getDatabase, ref, set ,get,remove} from "firebase/database";

function PostTwitter() {
const [posts, setPosts] = useState([]);
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] = useState(false);
const [editedPostId, setEditedPostId] = useState(null);
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [content, setContent] = useState('');
const [isedit, setisedit] = useState('');
const db = getDatabase();

useEffect(() => {
  fetchPosts();
}, []);

const fetchPosts = async () => {
    const db = getDatabase();
    const userRef = ref(db, "staffdetails");
    const userSnapshot = await get(userRef);
    const fetchedPosts = userSnapshot.val();
    if (fetchedPosts) {
      const postsArray = Object.keys(fetchedPosts).map((key) => ({
        id: key,
        ...fetchedPosts[key],
      }));
      setPosts(postsArray);
    }

};

const getRandomInt=(min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


const addPost = () => {
  let id = getRandomInt(1,500)
  if(editedPostId){
    id = editedPostId
  }
  const dbb = getDatabase();
  set(ref(dbb, 'staffdetails/' + id), {
      name: name,
      phone: phone,
      subject: content,
  });

  setShowModal(false);
  setName('');
  setPhone('');
  setContent('');
  fetchPosts();
};

const deletePost = (id) => {
  const db = getDatabase();
  remove(ref(db, 'staffdetails/' + id)).then(() => {
    fetchPosts();
  }).catch((error) => {
    console.error('Error removing post: ', error);
  });
};


const handleEdit = (id) => {
  const postToEdit = posts.find((post) => post.id === id);
  if (postToEdit) {
    setName(postToEdit.name);
    setPhone(postToEdit.phone);
    setContent(postToEdit.subject);
    setEditMode(true);
    setEditedPostId(id);
    setShowModal(true);
  }
};

  return (
    <>
<div className="container-fluid mt-5 text-center">
      <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
        Add New staff details
      </button>
</div>
    <div className="container mt-5">
    

    <table className="table">
  <thead>
    <tr>
      <th>Staff Name</th>
      <th>Phone Number</th>
      <th>Subjects</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {posts.map((post) => (
      <tr key={post.id}>
        <td>{post.name}</td>
        <td>{post.phone}</td>
        <td>{post.subject}</td>
    
        <td>
          <button
            className="btn btn-primary mr-2"
            onClick={() => handleEdit(post.id)}
          >
            Edit
          </button>
         
        </td>
        <td>
        <button
            className="btn btn-danger"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode ? 'Edit Post' : 'Add New Post'}
              </h5>
              <button
                className="close"
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setName('');
                  setPhone('');
                  setContent('');
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <textarea
                    className="form-control"
                    rows="1"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditMode(false);
                  setName('');
                  setPhone('');
                  setContent('');
                }}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={() => { addPost();  editMode?setisedit(editedPostId):setisedit(null) }}>
                {editMode ? 'Update Staff' : 'Add Staff'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PostTwitter;
