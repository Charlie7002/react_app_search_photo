import React from "react";

const Photo = ({
	urls: { regular: url },
	alt_description: desc,
	likes,
	user: {
		name,
		profile_image: { medium: profil_img },
		portfolio_url
	}
}) => {
	return (
		<article className="photo">
			<img src={url} alt={desc} />
			<div className="photo-info">
				<div>
					<h4>{name}</h4>
					<p>{likes} likes</p>
				</div>
				<a href={portfolio_url}>
					<img src={profil_img} alt={name} />
				</a>
			</div>
		</article>
	);
};

export default Photo;
