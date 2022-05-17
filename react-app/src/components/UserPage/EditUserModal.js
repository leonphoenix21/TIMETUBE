import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as AiIcons from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import { useParams, Redirect } from 'react-router-dom'
import './user_page.css';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDetails, userDetails } from '../../store/details';
import { MdOutlineManageAccounts } from "react-icons/md";

function EditUserModal({ User, sessionId }) {

    const user = useSelector(state => state.session.user)
    const { userId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [firstname, setFirstName] = useState(user.firstname)
    const [lastname, setLastName] = useState(user.lastname)
    const [avatar, setAvatar] = useState(user.avatar)
    const [header, setHeader] = useState(user.header)
    const [verify, setVerify] = useState(false)

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

        const detail = await dispatch(userDetails(formData));

        if (detail) {
            closeModal()
            return <Redirect to={`/users/${user.id}`} />;
            // history.push();
        } else {
            if (detail.errors) {
                setErrors(detail.errors);
            }
        }
    }

    const updateAvatar = (e) => {
        if (e) {
            const file = e.target.files[0];
            setAvatar(file);
        } else {
            setAvatar(user.avatar)
        }
    };

    const updateHeader = (e) => {
        if (e) {
            const file = e.target.files[0];
            setHeader(file);
        } else {
            setHeader(user.header)
        }
    };
    return (
        <div className='editModal'>
            {
                user.id === +userId ?
                    <div>
                        <button className="editUserbtn" onClick={openModal}>
                            Edit Account
                            <span className='accntIcon'>< MdOutlineManageAccounts /> </span>
                        </button>
                    </div>
                    :
                    <>
                    </>
            }

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="EditUser"
            >
                <form onSubmit={handleSubmit} >
                    <div className='editModals' ref={(_subtitle) => (subtitle = _subtitle)}>
                        <div className='modalIcons'>
                            <span className='modalHeader'> < MdManageAccounts /></span>
                            <span className='closeIcon' onClick={closeModal}> <AiIcons.AiOutlineClose /></span>
                        </div>
                        <div className="bottom-line modal"></div>


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
                                onChange={updateAvatar}
                                name="avatar"
                                id="avatar"
                            />
                        </div>
                        <div className='inputDiv' >
                            <label> header file </label>
                            <input
                                className="field"
                                type="file"
                                accept="image/*"
                                onChange={updateHeader}
                                name="header"
                                id="header"
                            />
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='submitbtn'>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}


export default EditUserModal;