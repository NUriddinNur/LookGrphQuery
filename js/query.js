
const USERS_QUERY = `
        query {
            users {
                userId
                username
                contact
            }
        }
    `

const FOODS_QUERY = `
	    query {
		    foods {
			    foodId
			    foodName
		    }
	    }
    `

const ORDERS_QUERY = `
	query X ($userId: ID) {
  		orders (userId : $userId) {
  		  	count
  		  	food {
  		    	foodName
  		    	foodImg
  		  	}
  		}
	}
`

const ADD_USER = `
	mutation ADD_USER($username: String! $contact: String!) {
  		addUser (
  		  	username: $username
  		  	contact: $contact
  		) {
  		  	status
  		  	message
  		}
	}
`

const ADD_ORDER = `
	mutation ADD_ORDER ($foodId: Int! $userId: Int! $count:Int!) {
  		addOrder(
  		  	foodId: $foodId,
  		  	userId: $userId
  		  	count: $count
  		) {
  		  	status
  		  	message
  		}
	}
`