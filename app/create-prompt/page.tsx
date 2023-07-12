"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "@components/"; 

const CreatePrompt = () => {
	const [submitting, setSubmitting] = useState(false);

	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const router = useRouter();
	const { data: session } = useSession();

	const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default form submission,  that is, page refresh
		setSubmitting(true); //  we can use it as a loading indicator later on
		try {
			const res = await fetch("/api/prompt/new", {
				// this is the API route we created
				method: "POST", 
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user?.id,
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
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
