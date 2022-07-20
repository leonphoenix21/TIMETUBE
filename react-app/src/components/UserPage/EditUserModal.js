import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as AiIcons from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import { useParams, Redirect } from 'react-router-dom'
import './user_page.css';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../store/details';
import { MdOutlineManageAccounts } from "react-icons/md";

function EditUserModal() {

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
    const [active, setActive] = useState(false)

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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstname.length > 25) return setErrors(['firstname must be less than a 25 characters'])
        if (lastname.length > 25) return setErrors(['lastname must be less than a 25 characters'])
        if (firstname.trim().length === 0) return setErrors(['add firstname'])
        if (lastname.trim().length === 0) return setErrors(['add lastname'])



        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("avatar", avatar);
        formData.append("header", header);

        // const detail = await dispatch(userDetails(formData));
        dispatch(userDetails(formData)).then(res => {
            if (res.errors) {
                if (res.errors) {
                    setErrors(res.errors);
                }
                // return <Redirect to={`/users/${user.id}`} />;

            } else {
                if (!res.errors) {
                    closeModal()
                    history.push(`/user/${user.id}`);
                }
            }
        })
    }
    const updateFirstBtnActivity = (e) => {

        if (e.target.value.length === 25) {
            setActive(false)
            return (setErrors([`firstname can not exceed 25 letters, current: ${e.target.value.length}`]))
        }
        else {
            setActive(true)
            return (setErrors([]))
        }

    }

    const updateLastBtnActivity = (e) => {

        if (e.target.value.length === 25) {
            setActive(false)
            return (setErrors([`lastname can not exceed 25 letters, current: ${e.target.value.length}`]))
        }
        else {
            setActive(true)
            return (setErrors([]))
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
                        <button className='editUserbtn' onClick={openModal}>
                            < MdOutlineManageAccounts />
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
                    <div className='errors'>
                        {errors.map((error, ind) => (
                            <div key={ind} className='eachError'>{error}</div>
                        ))}
                    </div>
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
                                    onChange={(e) => (
                                        updateFirstBtnActivity(e),
                                        setFirstName(e.target.value)
                                    )}
                                    value={firstname}
                                    placeholder={user.firstname}
                                    maxLength={25}
                                    name='firstname'
                                    required
                                />
                            </div>
                            <div>
                                <label className='lastname'> last name </label>
                                <input
                                    className='field lastname'
                                    type="text"
                                    onChange={(e) => (
                                        updateLastBtnActivity(e),
                                        setLastName(e.target.value)
                                    )}
                                    value={lastname}
                                    maxLength={25}
                                    placeholder={user.lastname}
                                    name='firstname'
                                    required
                                />
                            </div>

                        </div>

                        <div className='inputDiv' >
                            <label htmlFor='avatar' className='select-video-button' style={{ margin: '5px 5px 5px 0px' }}> Choose Profile Image . . .</label>
                            <input
                                className="field"
                                type="file"
                                accept="image/*"
                                onChange={updateAvatar}
                                name="avatar"
                                id="avatar"
                                hidden
                            />
                        </div>
                        <div className='inputDiv' >
                            <label htmlFor='header' className='select-video-button' style={{ margin: '5px 5px -5px 0px' }}> Choose Header Image . . .</label>
                            <input
                                className="field"
                                type="file"
                                accept="image/*"
                                onChange={updateHeader}
                                name="header"
                                id="header"
                                hidden
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