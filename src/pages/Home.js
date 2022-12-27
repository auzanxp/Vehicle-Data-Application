import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/dataApi'
import Modal from '../components/modal/Modal';

const Home = () => {

    const navigate = useNavigate()
    const [datas, setDatas] = useState(null)
    const [isShow, setIsShow] = useState(false);
    const [fetchStatus, setFetchStatus] = useState(false);
    const [seletcedData, setSelectedData] = useState();
    const [search, setSearch] = useState({
        no_registrasi: '',
        nama_pemilik: ''
    })

    const getData = () => {
        axios.get('/kendaraan')
            .then((res) => {
                setDatas(res.data)
                setFetchStatus(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setDatas(null)
        const getSearchData = async () => {
            const { data } = await axios.get('/kendaraan')
            const response = data
            const filterData = response.filter((res) => {
                return res.no_registrasi === search.no_registrasi || res.nama_pemilik === search.nama_pemilik
            })
            setDatas([...filterData])
        }
        getSearchData()
        setSearch({
            no_registrasi: '',
            nama_pemilik: ''
        })
    }

    const handleInputSearch = (e) => {
        const { value, name } = e.target
        setSearch({ ...search, [name]: value });
    }

    const handleEditData = (e) => {
        const ID = parseInt(e.target.value)
        axios.get(`/kendaraan/${ID}`)
            .then(() => {
                setFetchStatus(false)
            })
        navigate(`/edit/${ID}`)
    }

    const handleDelete = (e) => {
        const ID = parseInt(e.target.value)
        axios.delete(`/kendaraan/${ID}`)
            .then(() => {
                setIsShow(false)
                setFetchStatus(true)
            })
    }

    const getAllData = (data) => {
        setSelectedData(data);
        setIsShow(true);
    }


    useEffect(() => {
        getData();
    }, [fetchStatus])


    return (
        <>
            <div className='container'>
                <div className='card_search'>
                    <form onSubmit={handleSearch}>
                        <label>No. Registrasi</label>
                        <input
                            type='search'
                            name='no_registrasi'
                            value={search.no_registrasi}
                            onChange={handleInputSearch}
                            required
                        />
                        <label>Nama Pemilik</label>
                        <input
                            type='search'
                            name='nama_pemilik'
                            value={search.nama_pemilik}
                            onChange={handleInputSearch}
                            required
                        />
                        <button
                            type='submit'
                            className='btn'
                        >Search</button>
                    </form>
                </div>
                <div>
                    <Link to='/create' className='btn'>Add Data</Link>
                </div>
                <div>
                    <table className='form_table'>
                        <thead>
                            <tr>
                                <th>
                                    no
                                </th>
                                <th>
                                    no registrasi
                                </th>
                                <th>
                                    Nama Pemilik
                                </th>
                                <th>
                                    Merek Kendaraan
                                </th>
                                <th>
                                    Tahun Pembuatan
                                </th>
                                <th>
                                    Kapasitas
                                </th>
                                <th>
                                    Warna
                                </th>
                                <th>
                                    Bahan bakar
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas !== null && datas.map((item, i) => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {item.no_registrasi}
                                        </td>
                                        <td>
                                            {item.nama_pemilik}
                                        </td>
                                        <td>
                                            {item.merk_kendaraan}
                                        </td>
                                        <td>
                                            {item.tahun_pembuatan}
                                        </td>
                                        <td>
                                            {item.kapasitas + ' cc'}
                                        </td>
                                        <td>
                                            {item.warna}
                                        </td>
                                        <td>
                                            {item.bahan_bakar}
                                        </td>
                                        <td>
                                            <button
                                                className='btn_detail'
                                                onClick={() => navigate(`/detail/${item.id}`)}
                                            >
                                                Detail</button>

                                            <button
                                                className='btn_edit'
                                                value={item.id}
                                                onClick={handleEditData}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='btn_delete'
                                                value={item.id}
                                                onClick={() => {
                                                    getAllData(item)
                                                }}
                                            >
                                                Delete
                                            </button>
                                            {
                                                isShow &&
                                                <Modal
                                                    name={seletcedData?.no_registrasi}
                                                    value={seletcedData?.id}
                                                    action={handleDelete}
                                                    close={() => {
                                                        setIsShow(false);
                                                    }}
                                                />
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home
