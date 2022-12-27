import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from '../api/dataApi'

const CreateData = () => {

    const { Id } = useParams();
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const [input, setInput] = useState({
        no_registrasi: '',
        nama_pemilik: '',
        alamat: '',
        merk_kendaraan: '',
        tahun_pembuatan: '',
        kapasitas: '',
        warna: '',
        bahan_bakar: ''
    });

    const handleInput = (e) => {
        const { value, name } = e.target
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {
            no_registrasi,
            nama_pemilik,
            alamat,
            merk_kendaraan,
            tahun_pembuatan,
            kapasitas,
            warna,
            bahan_bakar
        } = input

        if (Id) {
            axios.put(`/kendaraan/${Id}`, {
                no_registrasi,
                nama_pemilik,
                alamat,
                merk_kendaraan,
                tahun_pembuatan,
                kapasitas,
                warna,
                bahan_bakar
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios.post('/kendaraan', {
                no_registrasi,
                nama_pemilik,
                alamat,
                merk_kendaraan,
                tahun_pembuatan,
                kapasitas,
                warna,
                bahan_bakar
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        navigate('/')
        setInput({
            no_registrasi: '',
            nama_pemilik: '',
            alamat: '',
            merk_kendaraan: '',
            tahun_pembuatan: '',
            kapasitas: '',
            warna: '',
            bahan_bakar: ''
        })
    }

    useEffect(() => {
        if (Id !== undefined) {
            axios.get(`/kendaraan/${Id}`)
                .then((res) => {
                    const data = res.data
                    setInput({
                        no_registrasi: data.no_registrasi,
                        nama_pemilik: data.nama_pemilik,
                        alamat: data.alamat,
                        merk_kendaraan: data.merk_kendaraan,
                        tahun_pembuatan: data.tahun_pembuatan,
                        kapasitas: data.kapasitas,
                        warna: data.warna,
                        bahan_bakar: data.bahan_bakar
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [Id])


    return (
        <>
            <div className='container_form'>
                <h2>{Id ? 'Edit' : 'Tambah'} Data Kendaraan</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form_data'>
                        <div>
                            <label>No Registrasi Kendaraan</label>
                            <input
                                type='text'
                                name='no_registrasi'
                                value={input.no_registrasi}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                                required
                            />
                            <label>Nama Pemilik</label>
                            <input
                                type='text'
                                name='nama_pemilik'
                                value={input.nama_pemilik}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                                required
                            />
                            <label>Merk Kendaraan</label>
                            <input
                                type='text'
                                name='merk_kendaraan'
                                value={input.merk_kendaraan}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                            />
                            <label>Alamat Pemilik Kendaraan</label>
                            <textarea
                                type='text'
                                rows='4'
                                cols='50'
                                name='alamat'
                                value={input.alamat}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                            />
                        </div>
                        <div>
                            <label>Tahun Pembuatan</label>
                            <input
                                type='number'
                                maxLength={4}
                                name='tahun_pembuatan'
                                value={input.tahun_pembuatan}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                            />
                            <label>Kapasitas Silinder</label>
                            <input
                                type='number'
                                name='kapasitas'
                                value={input.kapasitas}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                            />
                            <label>Warna Kendaraan</label>
                            <input
                                type='text'
                                name='warna'
                                value={input.warna}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                            />
                            <label>Bahan Bakar</label>
                            <input
                                type='text'
                                name='bahan_bakar'
                                value={input.bahan_bakar}
                                onChange={handleInput}
                                readOnly={location === `/detail/${Id}`}
                            />
                        </div>
                    </div>
                    {
                        location === `/detail/${Id}` ?
                            <Link
                                to={`/edit/${Id}`}
                                className='btn'>Ubah</Link> :
                            <button
                                type='submit'
                                className='btn'>Simpan</button>
                    }
                    <Link
                        to='/'
                        className='btn'
                    >
                        Kembali
                    </Link>
                </form>
            </div>
        </>
    )
}

export default CreateData
