"use client";

import { useState, useEffect } from "react";

import { PromptCard } from "@components/";

const PromptCardList = ({ data, handleTagClick }: any) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post: any) => (
				<PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

export const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]); // [ { prompt: "hello", tag: "world" }, { prompt: "hello", tag: "world" }

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();
			setPosts(data);
		};
		fetchData();
	}, []);

	return (
		<section className="feed">
			<form action="" className="relative w-full flex justify-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList data={posts} handleTagClick={() => {}} />
		</section>
	);
};
