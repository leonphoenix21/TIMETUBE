import React, { useState } from 'react';
import Modal from 'react-modal';
import * as AiIcons from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import './user_page.css';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userDetails } from '../../store/session';


function EditUserModal({ user }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [firstname, setFirstName] = useState(user.firstname)
    const [lastname, setLastName] = useState(user.lastname)
    const [avatar, setAvatar] = useState(user.avatar)
    const [header, setHeader] = useState(user.header)

    Modal.ariaHideApp = false

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'row'

        },
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'black';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const avatarUrl = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };
    const headerUrl = (e) => {
        const file = e.target.files[0];
        setHeader(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("avatar", avatar);
        formData.append("header", header);
        formData.append("password", user.password);
        const res = await dispatch(userDetails(formData));
        if (res) {
            if (res.errors) {
                setErrors(res.errors);
            } else {
                history.push(`/`);
            }
        }
    }

    return (
        <div className='editModal'>
            <div>
                <button className="editUserbtn" onClick={openModal}>Open Modal</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="EditUser"
            >
                <div className='editModals'>
                    <div className='modalIcons'>
                        <span className='modalHeader'> < MdManageAccounts /></span>
                        <span className='closeIcon' onClick={closeModal}> <AiIcons.AiOutlineClose /></span>
                    </div>
                    <div className="bottom-line modal"></div>

                    <form onSubmit={handleSubmit} ref={(_subtitle) => (subtitle = _subtitle)}>
                        <div className='fullname'>
                            <div>
                                <label> first name </label>
                                <input
                                    className='field'
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstname}
                                    placeholder={user.firstname}
                                    name='firstname'
                                    required
                                />
                            </div>
                            <div>
                                <label className='lastname'> last name </label>
                                <input
                                    className='field lastname'
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastname}
                                    placeholder={user.lastname}
                                    name='firstname'
                                    required
                                />
                            </div>

                        </div>

                        <div className='inputDiv' >
                            <label>  avatar file </label>
                            <input
                                className="field"
                                type="file"
                                accept="image/*"
                                onChange={avatarUrl}
                                name="avatar"
                                id="avatar"
                                required
                            />
                        </div>
                        <div className='inputDiv' >
                            <label> header file </label>
                            <input
                                className="field"
                                type="file"
                                accept="image/*"
                                onChange={headerUrl}
                                name="header"
                                id="header"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='submitbtn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


export default EditUserModal;