"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@components/";

const EditPrompt = () => {
	const [submitting, setSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");
	const router = useRouter();

	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const res = await fetch(`/api/prompt/${promptId}`);
			const data = await res.json();
			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default form submission,  that is, page refresh
		setSubmitting(true); //  we can use it as a loading indicator later on

    if(!promptId) return alert('Prompt ID not found');

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt, 
					tag: post.tag,
				}),
			});
 
			if (res.ok) router.push("/");

		} catch (error: any) {
			throw Error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
