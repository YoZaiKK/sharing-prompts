"use client";

import { useState, useEffect } from "react";

import { PromptCard } from "@components/"; 


interface Item{
	id: string;
	prompt: string;
	tag: string;
	creator: {
		_id: string;
		username: string;
		image: string;
	};
}


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
	const [allPosts, setAllPosts] = useState([]);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState<any>(null);
	const [searchedResults, setSearchedResults] = useState([]);

	// const [posts, setPosts] = useState([]); // [ { prompt: "hello", tag: "world" }, { prompt: "hello", tag: "world" }
	const handleSearchChange = (e: any) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tagName: string) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

	const fetchPosts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();

		setAllPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchtext: string) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item: Item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

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

			{searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};
