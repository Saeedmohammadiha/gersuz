import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import axios from 'axios';

export default function TextEditor({ handleChange }: { handleChange: (data: string) => void }) {
	function uploadAdapter(loader) {
		return {
			upload: () => {
				return new Promise((resolve, reject) => {
					const body = new FormData();
					loader.file.then((file) => {
						body.append('upload', file);

						axios
							.post(`${'https://test.gersuz.com/api/Blog/BlogFileUploadi'}`, body)
							.then((res) => {
								resolve({
									default: res.data.url
								});
							})
							.catch((err) => {
								reject(err);
							});
					});
				});
			}
		};
	}
	function uploadPlugin(editor) {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return uploadAdapter(loader);
		};
	}
	return (
		<CKEditor
			editor={Editor}
			config={{
				extraPlugins: [uploadPlugin],
				BaseHref: 'https://test.gersuz.com/api/Blog/BlogFileUploadi'
			}}
			data=""
			onReady={(editor) => {
				console.log('Editor is ready to use!', editor);
			}}
			onChange={(event, editor) => {
				handleChange(editor.getData());
			}}
			onBlur={(event, editor) => {
				console.log('Blur.', editor);
			}}
			onFocus={(event, editor) => {
				console.log('Focus.', editor);
			}}
		/>
	);
}
