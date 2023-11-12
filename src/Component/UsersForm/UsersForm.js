import React, { useEffect, useState } from "react"
import axios from "axios"
import cl from '../UsersForm/UsersForm.module.css'

export const UsersForm = (props) => {
    const [axiosConf, setAxiosConf] = useState({
        auth: {
            username: "adm-1",
            password: "a1d2"
        }
    })
    const [users, setUsers] = useState([])

    const defaultUserData = {
        username: '',
        password: '',
        role: '',
        name: '',
        inn: '',
        kpp: '',
        phone: '',
        email: '',
        address: '',
        company_name: ''
    }

    const [userData, setUserData] = useState(defaultUserData)

    const _URL = 'http://localhost:8081/users'

    const getListOfUsers = () => {
        console.log('GET ALL USERS')
        axios.get(_URL, axiosConf)
            .then((resp) => setUsers(resp.data))
    }

    const saveUserData = () => {
        axios.post(_URL, userData, axiosConf)
            .then(res => {
                console.log('user saved')
                setUserData(prev => defaultUserData)
                getListOfUsers()
            })
    }

    useEffect(getListOfUsers, [])

    const editUser = (user) => {

        axios.put(_URL, user, axiosConf)
        .then(res => {
            console.log('user saved')

            user.edited = false
            updateUsersMap()
        }).catch(
            e => console.log(e)
        )

        
    }

    const delUser = (user) => {
        axios.delete(_URL + '/' + user.username, axiosConf)
        .then(res => {
            console.log('User deleted')
            getListOfUsers()
        })
        .catch(
            e => console.log(e)
        )
    }

    const setParams = (user, e) => {
        user[e.target.name] = e.target.value
        user.edited = true
        updateUsersMap()
    }

    const updateUsersMap = () => {
        const users_tmp = []
        users.map(u => users_tmp.push(u))
        setUsers(users_tmp)
    }

    const setUserParams = (e) => {
        const userData_tmp = { ...userData}
        userData_tmp[e.target.name] = e.target.value
        setUserData(prev => userData_tmp)
        console.log("QQQQ")
        console.log(userData)
    }



    const listOfUsers =

        (<table>
            <thead>
                <tr>
                    <th>Имя пользователя</th>
                    <th>ИНН</th>
                    <th>КПП</th>
                    <th>Телефон</th>
                    <th>Почта</th>
                    <th>Адрес</th>
                    <th>Компания</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, idx) =>
                    <tr key={`tr_${idx}`} className={user.edited ? cl.tr_edited : ''}>
                        <td>{user.username}</td>
                        <td><input name="inn" className={cl.input_order} placeholder="ИНН" value={user.inn == null ? '' : user.inn} onChange={e => setParams(user, e)} /></td>
                        <td><input name="kpp" className={cl.input_order} placeholder="КПП" value={user.kpp == null ? '' : user.kpp} onChange={e => setParams(user, e)} /></td>
                        <td><input name="phone" className={cl.input_order} placeholder="Тел." value={user.phone == null ? '' : user.phone} onChange={e => setParams(user, e)} /></td>
                        <td><input name="email" className={cl.input_order} placeholder="email" value={user.email == null ? '' : user.email} onChange={e => setParams(user, e)} /></td>
                        <td><input name="address" className={cl.input_order} placeholder="Адрес" value={user.address == null ? '' : user.address} onChange={e => setParams(user, e)} /></td>
                        <td><input name="company_name" className={cl.input_order} placeholder="Имя компании" value={user.company_name == null ? '' : user.company_name} onChange={e => setParams(user, e)} /></td>
                        <td><button className={`${cl.btn} ${cl.btn_edit}`} onClick={() => editUser(user)}>...</button> <button className={`${cl.btn} ${cl.btn_del}`} onClick={()=>delUser(user)}>X</button></td>
                    </tr>
                )}
            </tbody>
        </table>
        )

    return (
        <div className={cl.container}>
            <hr />
            <div className={cl.form}>
                <div><input className={cl.form_input} type="text" name="username" placeholder="username" value={userData.username} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="password" placeholder="password" value={userData.password} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="inn" placeholder="inn" value={userData.inn} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="kpp" placeholder="kpp" value={userData.kpp} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="phone" placeholder="phone" value={userData.phone} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="email" placeholder="email" value={userData.email} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="address" placeholder="address" value={userData.address} onChange={setUserParams} /></div>
                <div><input className={cl.form_input} type="text" name="company_name" placeholder="company name" value={userData.company_name} onChange={setUserParams} /></div>
                <div><button className={cl.btn_form} onClick={saveUserData}>Добавить</button></div>
            </div>
            <hr />
            <div>
                {listOfUsers}
            </div>
        </div>
    )



    // private String username;
    // private String password;
    // private String role;
    // private String name;
    // private String inn;
    // private String kpp;
    // private String phone;
    // private String email;
    // private String address;
    // private String company_name;

}