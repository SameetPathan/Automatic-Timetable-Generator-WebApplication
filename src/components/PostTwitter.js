import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { toast } from 'react-toastify';

function PostTwitter() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedPostId, setEditedPostId] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [isPractical, setIsPractical] = useState(false);
  const [activeStaff, setActiveStaff] = useState(false); // New flag to store active status
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

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const addPost = () => {
    let id = getRandomInt(1, 500);
    if (editedPostId) {
      id = editedPostId;
    }
    const dbb = getDatabase();
    set(ref(dbb, 'staffdetails/' + id), {
      name: name,
      phone: phone,
      subject: content,
      isPractical: isPractical, // Store isPractical flag
      activeStaff: activeStaff // Store active staff flag
    });

    toast.success("Staff Details Added.");

    setShowModal(false);
    setName('');
    setPhone('');
    setContent('');
    setIsPractical(false); // Reset isPractical flag after adding post
    fetchPosts();
  };

  const deletePost = (id) => {
    const db = getDatabase();
    remove(ref(db, 'staffdetails/' + id)).then(() => {
      fetchPosts();
    }).catch((error) => {
      console.error('Error removing post: ', error);
    });
    toast.success("Staff Details Deleted.");
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setName(postToEdit.name);
      setPhone(postToEdit.phone);
      setContent(postToEdit.subject);
      setIsPractical(postToEdit.isPractical); // Set isPractical flag for editing
      setActiveStaff(postToEdit.activeStaff); // Set activeStaff flag for editing
      setEditMode(true);
      setEditedPostId(id);
      setShowModal(true);
    }
    
  };

  const handleActiveStaffCheckbox = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedActiveStatus = !post.activeStaff;
        // Update activeStaff flag in the database
        const db = getDatabase();
        set(ref(db, 'staffdetails/' + postId + '/activeStaff'), updatedActiveStatus);

        return {
          ...post,
          activeStaff: updatedActiveStatus
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    toast.success("Staff Active Status Updated.");
  };

  return (
    <>
      <div className="container-fluid mt-5 text-center">

      
        <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
          Add New staff details
        </button>
      </div>
      <div className="container mt-5 border shadow p-3">
      <table className="table mb-5">
      <thead className='thead-dark'>
        <tr>
          <th>Staff Name</th>
          <th>Phone Number</th>
          <th>Subjects</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>Active</th> {/* New column for Active checkbox */}
          <th>Is Practical</th> {/* New column for Is Practical */}
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
                <i className="fas fa-edit"></i> {/* Edit icon */}
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deletePost(post.id)}
              >
                <i className="fas fa-trash-alt"></i> {/* Delete icon */}
              </button>
            </td>
            <td>
              <input
                type="checkbox"
                checked={post.activeStaff}
                onChange={() => handleActiveStaffCheckbox(post.id)}
              />
            </td>
            <td>
              {post.isPractical ? (
                <i className="fas fa-check-circle text-success"></i> // Yes icon
              ) : (
                <i className="fas fa-times-circle text-danger"></i> // No icon
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
        {/* Modal */}
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
                    setIsPractical(false);
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
                  <div className="form-group">
                    <label>
                      Is Practical
                      <input
                        type="checkbox"
                        className='ml-2'
                        checked={isPractical}
                        onChange={() => setIsPractical(!isPractical)}
                      />
                    </label>
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
                      setIsPractical(false);
                    }}
                  >
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={() => addPost()}>
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
  
