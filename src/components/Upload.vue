<template>
	<div class="bg-white rounded border border-gray-200 relative flex flex-col dark:bg-gray-600 dark:border-white">
		<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
			<span class="card-title dark:text-white">Upload</span>
			<i class="fas fa-upload float-right text-green-400 text-2xl"></i>
		</div>
		<div class="p-6">
			<!-- Upload Dropbox -->
			<div
				class="
					w-full
					px-10
					py-20
					rounded
					text-center
					cursor-pointer
					border border-dashed border-gray-400
					text-gray-400
					transition
					duration-500
					hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid
					dark:text-white
				"
				:class="{ 'bg-green-400 bordr-green-400 border-solid': is_dragover }"
				@dragend.prevent.stop="is_dragover = false"
				@dragover.prevent.stop="is_dragover = true"
				@dragenter.prevent.stop="is_dragover = true"
				@dragleave.prevent.stop="is_dragover = false"
				@drop.prevent.stop="upload($event)"
			>
				<h5>Drop your files here</h5>
			</div>
			<div class="font-bold block text-red-600 text-center pt-6" v-if="uploadError">Please upload a mp3 or flac</div>
			<div class="font-bold block text-red-600 text-center pt-6" v-if="alreadyHaveFile === true">You have already uploaded this file.</div>
			<hr class="my-6" />

			<!-- Progess Bars -->
			<div class="mb-4" v-for="upload in uploads" :key="upload.nmae">
				<!-- File Name -->
				<div class="font-bold text-sm dark:text-white mb-2" :class="upload.text_class">
					{{ upload.name.length > 30 ? upload.name.slice(0, 30) + "..." : upload.name }}<i :class="upload.icon" class="ml-4"></i>
				</div>
				<div class="flex h-4 overflow-hidden bg-gray-200 rounded">
					<!-- Inner Progress Bar -->
					<div class="transition-all progress-bar" :style="{ width: upload.current_progress + '%' }" :class="upload.variant"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { storage, auth, songsCollection, timeStamp } from "@/includes/firebase";
import { ref, onBeforeUnmount } from "vue";
import { onBeforeRouteLeave } from "vue-router";
export default {
	name: "upload",
	props: ["addSong"],
	setup(prop) {
		const is_dragover = ref(false);
		const uploads = ref([]);
		const uploadError = ref(false);
		const uploading = ref(false);
		const alreadyHaveFile = ref(false);

		const upload = async function (event) {
			uploading.value = true;
			is_dragover.value = false;
			uploadError.value = false;

			const files = event.dataTransfer.files ? [...event.dataTransfer.files] : [...event.target.files];

			for (let file of files) {
				if (file.type !== "audio/mpeg" && file.type !== "audio/flac") {
					uploading.value = false;
					uploadError.value = true;
					return;
				}

				const song = {
					uid: auth.currentUser.uid,
					display_name: auth.currentUser.displayName,
					original_name: file.name,
					modified_name: file.name,
					description: "",
					comment_count: 0,
					createdAt: timeStamp(),
					favorite_count: 0,
				};

				try {
					const songRef = await songsCollection.add(song);
					const storageRef = storage.ref(); //music-xxxxx.appspot.com <= root
					const songsRef = storageRef.child(`songs/${auth.currentUser.uid}/${songRef.id}`); //music-xxxxx.appspot.com/songs/example.mp3 <= sub

					const task = songsRef.put(file); // upload file

					const uploadIndex =
						uploads.value.push({
							task,
							current_progress: 0,
							name: file.name,
							variant: "bg-blue-400",
							icon: "fas fa-spinner fa-spin",
							text_class: "",
						}) - 1; // push return length therefore want index needs minus 1

					// upload task <= three function ( upload, error, success )
					task.on(
						"state_changed",
						snapshot => {
							const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							uploads.value[uploadIndex].current_progress = progress;
						},
						() => {
							uploads.value[uploadIndex].variant = "bg-red-400";
							uploads.value[uploadIndex].icon = "fas fa-times";
							uploads.value[uploadIndex].text_class = "text-red-400";
						},
						async () => {
							try {
								const url = await task.snapshot.ref.getDownloadURL(); // we get the path of the file

								await songRef.update({
									docID: songRef.id,
									url: url,
								});
							} finally {
								const songSnapshot = await songRef.get();
								prop.addSong(songSnapshot);
								uploading.value = false;
								uploads.value[uploadIndex].variant = "bg-green-400";
								uploads.value[uploadIndex].icon = "fas fa-check";
								uploads.value[uploadIndex].text_class = "text-green-400";
							}
						}
					);
				} catch (err) {
					console.log(err);
				}
			}
		};

		onBeforeRouteLeave((to, from, next) => {
			if (uploading.value) {
				const result = confirm("You have to wait your upload finish before leaving, are you sure to leave now?");
				if (result) {
					next();
				} else {
					return;
				}
			} else {
				next();
			}
		});

		onBeforeUnmount(() => {
			uploads.value.forEach(file => {
				file.task.cancel();
			});
		});

		return { is_dragover, upload, uploads, uploadError, alreadyHaveFile };
	},
};
</script>

<style lang="scss" scoped>
.upload-dropbox.upload-dropbox-drag {
	color: #fff;
	background-color: #20d862;
	border-color: #20d862;
	border-style: solid;
}

.progress-bar {
	background-size: 1rem 1rem;
	background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
	animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
	0% {
		background-position: 1rem 0;
	}
	100% {
		background-position: 0 0;
	}
}
</style>
>
