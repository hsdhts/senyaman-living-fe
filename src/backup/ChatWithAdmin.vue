<template>
    <div>
        <!-- Tombol Chat di Sudut Kanan Bawah -->
        <div class="fixed bottom-6 right-5">
            <button
                class="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-600"
                @click="toggleChat">
                <img src="@/assets/svg/socialmedia/whatsapp.svg" alt="Chat Icon" class="h-6 w-6"
                    style="filter: invert(1) brightness(100) saturate(100%);" />
            </button>
        </div>

        <!-- Popup Chat -->
        <div v-if="showChat" :style="{ bottom: '6rem', right: '50px' }" class="fixed bottom-16 right-5 bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
            <!-- Form Info User -->
            <div v-if="!isUserInfoSubmitted" class="px-12">
                <h3 class="text-lg font-semibold mb-2">Masukkan Detail Anda</h3>
                <input v-model="username" type="text" placeholder="Nama Anda" class="border rounded p-2 w-full mb-2" />
                <input v-model="email" type="email" placeholder="Email" class="border rounded p-2 w-full mb-2" />
                <input v-model="phoneNumber" type="tel" placeholder="Nomor Telepon"
                    class="border rounded p-2 w-full mb-2" />
                <button @click="submitUserInfo" class="bg-blue-500 text-white p-2 rounded w-full">
                    Mulai Chat
                </button>
            </div>

            <!-- Interface Chat -->
            <div v-else>
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">Chat dengan Admin</h3>
                    <button @click="toggleChat" class="text-red-500">X</button>
                </div>
                <div class="overflow-y-auto h-64 mb-4" ref="chatBox">
                    <div v-for="(message, index) in messages" :key="index" class="mb-2">
                        <!-- Sistem Message -->
                        <div v-if="message.senderType === 'system'" class="flex justify-center">
                            <div class="bg-yellow-100 text-center p-2 rounded-lg">
                                <p>{{ message.messageContent }}</p>
                            </div>
                        </div>
                        <!-- Admin Message -->
                        <div v-else-if="message.senderType === 'admin'" class="flex justify-start">
                            <div class="bg-gray-200 text-left p-2 rounded-lg max-w-xs">
                                <p>{{ message.messageContent }}</p>
                                <span class="text-xs text-gray-500">{{ formatTimestamp(message.createdAt) }}</span>
                            </div>
                        </div>
                        <!-- Customer Message -->
                        <div v-else class="flex justify-end">
                            <div class="bg-blue-500 text-white text-right p-2 rounded-lg max-w-xs">
                                <p>{{ message.messageContent }}</p>
                                <span class="text-xs text-gray-200">{{ formatTimestamp(message.createdAt) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Ketik pesan Anda..."
                    class="border rounded p-2 w-full" />
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            showChat: false,
            isUserInfoSubmitted: false,
            username: '',
            email: '',
            phoneNumber: '',
            userId: null,
            messages: [],
            newMessage: '',
            socket: null,
        };
    },
    methods: {
        toggleChat() {
            this.showChat = !this.showChat;
            if (this.showChat) {
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            }
        },
        async submitUserInfo() {
            try {
                // Mengirim info user ke backend dan mendapatkan userId
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.username,
                        email: this.email,
                        phoneNumber: this.phoneNumber,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Gagal membuat user');
                }

                const data = await response.json();
                this.userId = data.userId;
                this.isUserInfoSubmitted = true;

                // Inisialisasi Socket.IO
                this.socket = io('http://localhost:3000');

                // Emit 'register' event dengan userId
                this.socket.emit('register', this.userId);
                console.log(`User registered with userId: ${this.userId}`);

                // Mendengarkan event 'new_message'
                this.socket.on('new_message', (message) => {
                    console.log('New message received:', message);
                    if (message.userId == this.userId) {
                        if (message.messageContent === 'Admin telah memasuki ruangan.') {
                            // Pesan status admin masuk, tampilkan tanpa timestamp dan di tengah
                            this.messages.push({
                                senderType: 'system',
                                messageContent: message.messageContent,
                                createdAt: message.createdAt
                            });
                        } else {
                            this.messages.push(message);
                        }
                        this.$nextTick(() => {
                            this.scrollToBottom();
                        });
                    }
                });

                // Memuat pesan sebelumnya
                this.loadMessages();
            } catch (error) {
                console.error('Error during user registration:', error);
                alert('Gagal memulai chat. Silakan coba lagi.');
            }
        },
        async loadMessages() {
            try {
                const response = await fetch(`http://localhost:3000/api/messages/${this.userId}`);
                if (!response.ok) {
                    throw new Error('Gagal memuat pesan');
                }
                const data = await response.json();
                this.messages = data.map(msg => {
                    if (msg.messageContent === 'Admin telah memasuki ruangan.') {
                        return {
                            senderType: 'system',
                            messageContent: msg.messageContent,
                            createdAt: msg.createdAt
                        };
                    }
                    return msg;
                });
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        },
        async sendMessage() {
            if (this.newMessage.trim() === '') return;

            const messageData = {
                userId: this.userId,
                senderType: 'customer',
                messageContent: this.newMessage,
            };

            try {
                const response = await fetch('http://localhost:3000/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });

                if (!response.ok) {
                    throw new Error('Gagal mengirim pesan');
                }

                this.newMessage = '';
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Gagal mengirim pesan. Silakan coba lagi.');
            }
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleTimeString();
        },
        scrollToBottom() {
            const chatBox = this.$refs.chatBox;
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        },
    },
};
</script>

<style scoped>
/* Tidak perlu menambahkan style khusus jika menggunakan TailwindCSS */
</style>