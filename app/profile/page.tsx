"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Profile } from "@components/";
import { Post } from "@types";

const ProfilePage = () => {
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const router = useRouter();

	useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/users/${session.user.id}/posts`);
          const data = await res.json();
          setPosts(data);
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    };

    fetchData();
  }, [session]);

	const handleEdit = (post: Post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post: Post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});
				const filteredPosts = posts.filter((p: Post) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error: any) {
				throw Error(error.message);
			}
		}
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your profile page!"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;
