new Vue({
    el: '#app',
    data: {
        contacts: [],
        errors: [],
        newContact: {
            first_name: '',
            last_name: '',
            birth_day: '',
            phone: '',
            country: '(AR) Argentina'
        }
    },
    mounted: function() {
        this.getCountries()
    },
    methods: {
        getCountries: function() {
            var url = 'https://api-test.mecubro.net/api/countries';

            this.$http.get(url).then(function(response) {
                $.each(response.body, function(key, value) {
                    $("#country_id").append(new Option('(' + value.iso + ') ' + value.name, '(' + value.iso + ') ' + value.name));
                });
            }); 
        },
        addContact: function(e) {
            if(this.newContact.first_name && this.newContact.last_name && this.newContact.birth_day && this.newContact.phone && this.newContact.country) {
                this.contacts.push({
                    first_name: this.newContact.first_name,
                    last_name: this.newContact.last_name,
                    birth_day: this.newContact.birth_day,
                    phone: this.newContact.phone,
                    country: this.newContact.country
                });
                
                this.newContact.first_name = '';
                this.newContact.last_name = '';
                this.newContact.birth_day = '';
                this.newContact.phone = '';
                this.newContact.country = '(AR) Argentina';

                this.errors = [];

                return true;
            }

            this.errors = [];
            if(!this.newContact.first_name) {
                this.errors.push('First name required');
            }
            if(!this.newContact.last_name) {
                this.errors.push('Last name required');
            }
            if(!this.newContact.birth_day) {
                this.errors.push('Date of Birth required');
            }
            if(!this.newContact.phone) {
                this.errors.push('Phone required');
            }
            if(!this.newContact.country) {
                this.errors.push('Country required');
            }
            e.preventDefault();
        },
        deleteContact: function(contact) {
            this.contacts.splice(this.contacts.indexOf(contact), 1);
        }
    }
});