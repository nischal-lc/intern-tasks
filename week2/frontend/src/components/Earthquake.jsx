import { ArrowLeft, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { findFlagUrlByCountryName } from "country-flags-svg";
import { Link, useParams } from "react-router-dom";
import { getOneEq } from "../actions/data";

const Earthquake = () => {
	const { id } = useParams();
	const [data, setData] = useState({ country: "", magnitude: "", date: "" });
	const [error, setError] = useState("");

	useEffect(() => {
		async function getOne() {
			try {
				const response = await getOneEq(id);
				setData(response.data);
			} catch (err) {
				setError(err.response.data.error);
			}
		}
		getOne();
	}, []);
	const flagUrl = findFlagUrlByCountryName(data.country);
	return (
		<div className='w-screen h-screen relative p-2 overflow-hidden'>
			<Link to='/' className='flex gap-1 fixed'>
				<ArrowLeft /> Back to home
			</Link>
			<div className='w-full h-full flex items-center justify-center'>
				{error ? (
					<div className='text-xl rounded-sm bg-red-400/50 px-12 py-3 text-red-500 flex gap-2 items-center'>
						<TriangleAlert className='size-5' />
						Error: {error}
					</div>
				) : (
					<>
						<div className='card min-w-[300px] bg-gray-400/30 shadow-md p-2 rounded-md border border-[hsla(0,0%,0%,0.2)]'>
							<div className='flex justify-between  '>
								<div className='flex gap-2 items-center'>
									<img
										src={flagUrl ? flagUrl : "https://placehold.co/20"}
										className='size-5 select-none object-contain'
									/>
									<h1 className='font-bold'>{data.country}</h1>
								</div>
								<p className='text-gray-500 select-none'>id: {id}</p>
							</div>
							<p className='mt-1'>Magnitude: {data.magnitude}</p>
							<div className='flex justify-between'>
								<p className='leading-[1]'>{data.date}</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Earthquake;
