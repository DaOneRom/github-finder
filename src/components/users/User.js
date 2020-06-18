import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({
	user,
	loading,
	getUser,
	getUserRepos,
	repos,
	match,
}) => {
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	const {
		name,
		company,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = user;

	const badge = [
		{
			label: 'Followers',
			class: 'primary',
			prop: followers,
		},
		{
			label: 'Following',
			class: 'success',
			prop: following,
		},
		{
			label: 'Public Repos',
			class: 'light',
			prop: public_repos,
		},
		{
			label: 'Public Gists',
			class: 'dark',
			prop: public_gists,
		},
	];

	const gitProfile = [
		{
			prop: login,
			label: 'Username',
		},
		{
			prop: company,
			label: 'Company',
		},
		{
			prop: blog,
			label: 'Website',
		},
	];

	if (loading) return <Spinner />;
	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back to Search
			</Link>
			Hireable: {''}
			{hireable ? (
				<i className='fas fa-check text-success' />
			) : (
				<i className='fas fa-times-circle text-danger' />
			)}
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={avatar_url}
						className='round-img'
						alt=''
						style={{ width: '150px' }}
					/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className='btn btn-dark my-1'>
						Visit Giithub Profile
					</a>
					<ul>
						{gitProfile.map((profile, i) => {
							return (
								<li key={i}>
									{profile.prop && (
										<Fragment>
											<strong>{profile.label}: </strong>
											{profile.prop}
										</Fragment>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				{badge.map((badges, i) => {
					return (
						<div
							className={`badge badge-${badges.class}`}
							key={i}
						>
							{badges.label}: {badges.prop}
						</div>
					);
				})}
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

User.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired,
	repos: PropTypes.array.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
};

export default User;
