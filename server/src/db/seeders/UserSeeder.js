import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "chels@email.com",
        username: "Chels",
        password: "password"
      },
      {
        email: "cam@email.com",
        username: "Cam",
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