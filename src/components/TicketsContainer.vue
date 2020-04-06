<template>
<div class="row justify-content-center bg-color pt-4">
  <div class="col-md-10">
    <div class="row mt-4">
      <div class="col-md-10 text-white">
        <h3>My Tickets:</h3>
      </div>
    </div>
    <div v-if="table" class="row">
      <table class="table table-striped bg-color1 shadow-lg text-white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Topic</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in tickets.data" :key="index">
            <th class="c-pointer" @click="viewTicket(index)" scope="row">{{ ticket.id }}</th>
            <td>{{ ticket.title }}</td>
            <td>{{ ticket.topic.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row text-white" v-else>
      <div class="col-md-12">
        <p @click="table = true">Back</p>
        <h5>Descrizione:</h5>
        <p>{{ ticket.body }}</p>
        <h5>Note di lavorazione:</h5>
        <p v-for="(note, index) in notes" :key="index"><strong>{{ note.created_at }}</strong> {{ note.body }}</p>
        <form @submit.prevent="postNote">
          <div class="form-group">
            <h5>Aggiungi nota:</h5>
            <textarea name="name" rows="8" cols="80"></textarea>
          </div>
          <input type="submit" name="" value="Aggiungi">
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TicketsContainer',
  data() {
    return {
      tickets: [],
      table: true,
      ticket: {},
      notes: []
    }
  },
  mounted() {
    axios.get('http://localhost:8000/api/tickets/user/1')
      .then(res => {
        this.tickets = res;
        console.log(this.tickets);
      })
      .catch(err => {
        console.log(err);
      })
  },
  methods: {
    viewTicket(index) {
      this.ticket = this.tickets.data[index];
      this.table = false;
      axios.get(`http://localhost:8000/api/tickets/${this.ticket.id}/notes`)
        .then(res => {
          this.notes = res.data;
          console.log(this.notes);
        })
        .catch(err => {
          console.log(err);
        })
    },
    postNote(){
      //axios.post()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
