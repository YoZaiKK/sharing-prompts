"use client";
import { useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

import { Post } from "@types";

interface Props {
	post: Post;
	handleTagClick?: (tag: string) => void;
	handleEdit?: () => void;
	handleDelete?: () => void;
}

interface CustomUser {
	id: string;
	name: string;
	email: string;
	image: string;
}

export const PromptCard = ({
	post,
	handleTagClick,
	handleEdit,
	handleDelete,
}: Props) => {
	const { data: session } = useSession();
	const router = useRouter();
	const pathName = usePathname();

	const [isCopied, setIsCopied] = useState("");

	const handleCopy = () => {
		navigator.clipboard.writeText(post.prompt);
		setIsCopied(post.prompt);
		setTimeout(() => setIsCopied(""), 3000);
	};

	const user = session?.user as CustomUser | undefined;
	const userId = user?.id;

	const handleProfileClick = () => {
		if (post.creator._id === userId) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div
					className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
					onClick={handleProfileClick}
				>
					<Image
						src={post.creator?.image as string}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post.creator?.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post.creator?.email}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={
							isCopied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						alt="copy_icon"
						width={12}
						height={12}
					/>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-grey-700">{post.prompt}</p>
			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>
			{userId === post.creator?._id &&
				pathName === "/profile" &&
				session?.user && (
					<div className="mt-5 flex justify-center gap-4 border-t border-gray-100 p-3">
						<p
							className="font-inter text-sm green_gradient cursor-pointer"
							onClick={handleEdit}
						>
							Edit
						</p>
						<p
							className="font-inter text-sm orange_gradient cursor-pointer"
							onClick={handleDelete}
						>
							Delete
						</p>
					</div>
				)}
		</div>
	);
};
