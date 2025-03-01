import { useEffect, useState } from "react";
import "../App.css";
import { findFlagUrlByCountryName } from "country-flags-svg";
import { addEq, deleteEq, editEq, fetchData } from "../actions/data";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../configs/toastConfig";
import { Link } from "react-router-dom";

const Home = () => {
	const [earthquakes, setEarthquakes] = useState([]);
	const [formData, setFormData] = useState({
		country: "",
		magnitude: "",
		date: "",
	});
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		fetchData().then((data) => setEarthquakes(data));
	}, [refresh]);

	const addData = async (e) => {
		e.preventDefault();
		try {
			const response = await addEq(formData);
			toast(response.data.message, toastConfig);
			setFormData({ country: "", magnitude: "", date: "" });
			setRefresh(!refresh);
		} catch (err) {
			toast(err.response.data.error, toastConfig);
		}
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<>
			<ToastContainer />
			<h1 className='px-3 py-2 text-4xl font-bold'>List of Earthquakes</h1>
			<div className='flex relative'>
				{earthquakes.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 w-full'>
						{earthquakes.map((eq) => {
							const flagUrl = findFlagUrlByCountryName(eq.country);
							return (
								<Link
									key={eq.id}
									to={`earthquakes/${eq.id}
								`}>
									<Card
										id={eq.id}
										country={eq.country}
										magnitude={eq.magnitude}
										date={eq.date}
										flag={flagUrl}
										setRefresh={setRefresh}
										refresh={refresh}
									/>
								</Link>
							);
						})}
					</div>
				) : (
					<div className='w-full flex items-center justify-center'>
						<p className='select-none text-gray-600'>No data available.</p>
					</div>
				)}
				<div className='flex flex-col min-w-[350px] mx-3 mt-2 sticky top-4 right-3 bg-gray-200 px-2 py-1 rounded-md border border-[hsla(0,0%,0%,0.2)] max-h-max'>
					<h1 className='font-bold text-lg'>Actions:</h1>
					<p className='text-sm font-medium text-gray-700 my-2'>Add data:</p>
					<form
						className='flex flex-col space-y-1'
						onSubmit={(e) => addData(e)}>
						<label htmlFor='country' className='text-sm'>
							Country
						</label>
						<input
							type='text'
							name='country'
							placeholder='eg. Nepal'
							required
							id='country'
							onChange={(e) => handleInput(e)}
							value={formData.country}
							className='border rounded-sm px-1 outline-none border-[hsla(0,0%,0%,0.5)] py-1'
						/>

						<label htmlFor='magnitude' className='text-sm'>
							Magnitude
						</label>
						<input
							type='number'
							name='magnitude'
							placeholder='eg. 1.2'
							required
							onChange={(e) => handleInput(e)}
							value={formData.magnitude}
							id='magnitude'
							className='border rounded-sm px-1 outline-none border-[hsla(0,0%,0%,0.5)] py-1'
						/>
						<label htmlFor='date' className='text-sm'>
							Date
						</label>
						<input
							type='date'
							name='date'
							required
							id='date'
							onChange={(e) => handleInput(e)}
							value={formData.date}
							className='border rounded-sm px-1 outline-none border-[hsla(0,0%,0%,0.5)] py-1'
						/>
						<button
							type='submit'
							className='w-full  rounded-sm py-1.5 mt-1 bg-gray-900 text-white cursor-pointer'>
							Add data
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

// eslint-disable-next-line react/prop-types
const Card = ({ country, magnitude, date, flag, id, setRefresh, refresh }) => {
	const [editing, setEditing] = useState(false);
	const [prevData, setPrevData] = useState({ country, magnitude, date });
	const handleEdit = () => {
		setEditing(!editing);
	};
	const handleDataEdit = (e) => {
		const { name, value } = e.target;
		setPrevData((prev) => ({ ...prev, [name]: value }));
	};
	const editData = async (e) => {
		e.preventDefault();
		try {
			const response = await editEq(prevData, id);
			toast(response.data.message, toastConfig);
			setRefresh(!refresh);
		} catch (err) {
			toast(err.response.data.error, toastConfig);
		}
		handleEdit();
	};
	const removeData = async (id) => {
		try {
			await deleteEq(id);
		} catch (err) {
			toast(err.response.data.error, toastConfig);
		}
		setRefresh(!refresh);
	};
	return (
		<div className='flex flex-col p-2 bg-gray-200 max-h-max transition duration-200 rounded-md shadow-md shadow-black/10 border border-[hsla(0,0%,0%,0.2)]'>
			<div className='flex justify-between'>
				<div className='flex gap-2 items-center'>
					<img
						src={flag ? flag : "https://placehold.co/20"}
						className='size-5 select-none object-contain'
					/>
					<h1 className='font-bold'>{country}</h1>
				</div>
				<p className='text-gray-500 select-none'>id: {id}</p>
			</div>
			{editing ? (
				<form className='flex flex-col space-y-1' onSubmit={(e) => editData(e)}>
					<label htmlFor='country' className='text-sm'>
						Country
					</label>
					<input
						type='text'
						name='country'
						placeholder='eg. Nepal'
						required
						id='country'
						onInput={(e) => handleDataEdit(e)}
						value={prevData.country}
						className='border rounded-sm px-1 outline-none border-[hsla(0,0%,0%,0.5)] py-1'
					/>

					<label htmlFor='magnitude' className='text-sm'>
						Magnitude
					</label>
					<input
						type='number'
						name='magnitude'
						placeholder='eg. 1.2'
						required
						value={prevData.magnitude}
						onInput={(e) => handleDataEdit(e)}
						id='magnitude'
						className='border rounded-sm px-1 outline-none border-[hsla(0,0%,0%,0.5)] py-1'
					/>
					<label htmlFor='date' className='text-sm'>
						Date
					</label>
					<input
						type='date'
						name='date'
						required
						value={prevData.date}
						onInput={(e) => handleDataEdit(e)}
						id='date'
						className='border rounded-sm px-1 outline-none border-[hsla(0,0%,0%,0.5)] py-1'
					/>
					<button
						type='submit'
						className='w-full flex  items-center justify-center gap-1 rounded-sm py-1.5 mt-1 bg-gray-900 text-white cursor-pointer'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-5'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
							/>
						</svg>
						Save
					</button>
				</form>
			) : (
				<>
					<p className='mt-1'>Magnitude: {magnitude}</p>
					<div className='flex justify-between'>
						<p className='leading-[1]'>{date}</p>
						<div className='flex gap-1 items-center'>
							<span
								title='Edit'
								className='p-1 hover:bg-neutral-600 hover:text-white transition duration-200 rounded-full cursor-pointer'
								onClick={() => handleEdit()}>
								{editing ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='size-5'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='size-5'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
										/>
									</svg>
								)}
							</span>
							<span
								title='Delete'
								className='p-1 cursor-pointer hover:bg-neutral-600 hover:text-white transition duration-200 rounded-full'
								onClick={() => removeData(id)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-5'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
									/>
								</svg>
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
