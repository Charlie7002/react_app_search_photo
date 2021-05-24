import React from "react";

const Photo = ({
	urls: { regular: url },
	alt_description: desc,
	likes,
	user: {
		name,
		profile_image: { medium: profil_img },
		portfolio_url
	},
	links: { download },
	loading
}) => {
	return (
		<article className="photo">
			<a href={download} target="_blank" rel="noopener noreferrer">
				<img src={url} alt={desc} />
			</a>
			<div className="photo-info">
				<div>
					<h4>{name}</h4>
					<p>{likes} likes</p>
				</div>
				<a href={portfolio_url} target="_blank" rel="noopener noreferrer">
					<img src={profil_img} alt={name} />
				</a>
			</div>
		</article>
	);
};

export default Photo;
