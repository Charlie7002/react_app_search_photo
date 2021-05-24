import React, { useState, useEffect } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { FcImageFile } from "react-icons/fc";
import Photo from "./Photo";
import loader from "./loader.svg";

console.clear();

const clientID = process.env.REACT_APP_CLIENT_ID;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");
	const [empty, setEmpty] = useState(false);

	const fetchImage = async () => {
		setEmpty(false);
		setLoading(true);
		let url;
		const per_page = `&per_page=${12}`;
		const urlPage = `&page=${page}`;
		const urlQuery = `&query=${query}`;

		if (query) {
			url = `${searchUrl}${clientID}${per_page}${urlPage}${urlQuery}`;
			console.log(url);
		} else {
			url = `${mainUrl}${clientID}${per_page}${urlPage}`;
		}

		try {
			const res = await fetch(url);
			console.log(res.status);

			const data = await res.json();
			console.log(data);
			//data not the same place for search

			setPhotos((oldPhotos) => {
				if (query && page === 1) {
					return data.results;
				} else if (query) {
					return [...oldPhotos, ...data.results];
				} else {
					return [...oldPhotos, ...data];
				}
			});

			if (data.total === 0) {
				setEmpty(true);
			}

			setLoading(false);
		} catch (error) {
			console.log(error);

			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			let innerHeight = window.innerHeight;
			let bodyHeight = document.body.scrollHeight;
			let scrollY = window.scrollY;
			if (!loading && innerHeight + scrollY >= bodyHeight - 2) {
				setPage((oldPage) => {
					return oldPage + 1;
				});
			}
		});

		return () => {
			window.removeEventListener("scroll", event);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchImage();
		setPage(1);
	};

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	console.log(page);

	return (
		<main>
			<section className="search">
				<div className="main-title">
					<div className="title-img">
						<FcImageFile />
					</div>
					<h1>Image Search</h1>
				</div>
				<form className="search-form">
					<input type="text" placeholder="Search" className="form-input" value={query} onChange={handleChange} />
					<button type="submit" className="submit-btn" onClick={handleSubmit}>
						<AiOutlineSearch />
					</button>
				</form>
			</section>
			{empty ? (
				<p className="no-result">Sorry, no result. Try again.</p>
			) : (
				<section className="photos">
					<div className="photos-center">
						{photos.map((photo) => {
							const { id } = photo;
							return <Photo key={id} {...photo} loading={loading} />;
						})}
					</div>
				</section>
			)}

			{loading && (
				<div className="loader-container">
					<img src={loader} />
				</div>
			)}
		</main>
	);
}

export default App;
