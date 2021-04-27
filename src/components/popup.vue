<template>
	<div class="popup-wrapper" ref="popup-wrapper">
		<div class="popup">
			<div class="popup__header">
				<span>{{popupTitle}}</span>
			</div>
			<div class="popup__footer">
				<button
					class="close_modal btn"
					@click="closePopup"
				>Ok</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "v-popup",
		props: {
			popupTitle: {
				type: String,
				default: 'Popup name'
			}
		},
		methods: {
			closePopup() {
				this.$emit('closePopup')
			},
		},
		mounted() {
			document.addEventListener('click', (item) => {
				if (item.target === this.$refs['popup-wrapper']) {
					this.closePopup()
				}
			})
		}
	}
</script>

<style lang="scss">
	.popup-wrapper {
		background: rgba(64,64,64, .7);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
	}
	.popup {
		padding: 16px;
		position: fixed;
		top: 20%;
		width: 400px;
		background: bisque;
		box-shadow: 0 0 17px skyblue;
		border-radius: 10px;
		z-index: 3;
		font-size: 30px;
	  letter-spacing: 10px;
	  color: red;
	  text-shadow: 1px 1px black;
		&__header, &__footer {
			text-align: center;
			margin: 10px;
		}
		.close_modal {
			width: 110px;
			letter-spacing: 3px;
			text-transform: uppercase;
			padding: 6px;
			background: red;
			color: white;
		}
	}
</style>