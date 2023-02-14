import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "chels@email.com",
        username: "chels!5c00l",
        password: "password"
      },
      {
        email: "cam@email.com",
        username: "camer0ni",
        password: "12345"
      }
    ]

    for (const user of usersData) {
      const currentUser = await User.query().findOne({ email: user.email })
      if(!currentUser) {
        await User.query().insert(user)
      }
    }
  }
}

export default UserSeeder