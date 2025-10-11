import axios from "axios";
import { useEffect, useRef, useState } from "react";

function Admin(){
    const [form, setForm] = useState({ title: '', description: '', date: '' });
    const [imgUrl, setImgUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const widgetRef = useRef(null);

    useEffect(() => {
        // Create Cloudinary widget once
        if (typeof cloudinary === 'undefined') {
            console.warn('Cloudinary not available on window');
            return;
        }
        if (!widgetRef.current) {
            widgetRef.current = cloudinary.createUploadWidget({
                cloudName: 'dfseckyjx',
                uploadPreset: 'qbvu3y5j',
                sources: ['local','url','camera'],
                multiple: false,
                cropping: false
            }, (error, result) => {
                if (!error && result && result.event === 'success') {
                    setImgUrl(result.info.secure_url);
                    setMessage({ type: 'success', text: 'Image uploaded' });
                } else if (error) {
                    console.error('Cloudinary upload error', error);
                    setMessage({ type: 'error', text: 'Image upload failed' });
                }
            });
        }
    }, []);

    const openUpload = () => {
        if (widgetRef.current) widgetRef.current.open();
        else setMessage({ type: 'error', text: 'Upload widget not available' });
    }

    const submit = async () => {
        setMessage(null);
        if (!form.title || !form.description || !form.date || !imgUrl) {
            setMessage({ type: 'error', text: 'Please fill all fields and upload an image.' });
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5500/news', { title: form.title, desc: form.description, date: form.date, img: imgUrl });
            if (res.status === 200) {
                setMessage({ type: 'success', text: 'Event added successfully!' });
                setForm({ title: '', description: '', date: '' });
                setImgUrl('');
            } else {
                setMessage({ type: 'error', text: res.data?.message || 'Failed to add event' });
            }
        } catch (err) {
            console.error('Error during event submission:', err);
            setMessage({ type: 'error', text: 'An error occurred while submitting the event.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold mb-4">Admin — Add News / Event</h2>

                {message && (
                    <div className={`p-3 rounded mb-4 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-4">
                    <input className="w-full border rounded p-2" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                    <input className="w-full border rounded p-2" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                    <input className="w-full border rounded p-2" placeholder="Date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />

                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={openUpload}>Upload Image</button>
                        {imgUrl && <img src={imgUrl} alt="uploaded" className="h-20 rounded object-cover" />}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button className="px-4 py-2 rounded border" onClick={() => { setForm({ title: '', description: '', date: '' }); setImgUrl(''); setMessage(null); }}>Clear</button>
                        <button className={`px-4 py-2 rounded bg-blue-600 text-white ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} onClick={submit} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;