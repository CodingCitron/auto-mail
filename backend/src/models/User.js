const User = (sequelize, DataTypes, option) => {
	const User = sequelize.define(
		"User",
		{
			// sequelize는 아이디를 생략해도 된다.
			// id: {
			// 	type: DataTypes.INTEGER,
			// 	primaryKey: true,
			// 	autoIncrement: true	
			// },
			email: {
				type: DataTypes.STRING(30),
				allowNull: false, // 필수
				unique: true, // 고유한 값
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			// created_at: {
			// 	type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY) 
			// 	allowNull: false,
			// 	defaultValue: DataTypes.NOW,
			// }
		},
		{
			...option,
			modelName: 'User', // 자바스크립트에서 사용하는 이름
			tableName: 'users', // 실제 디비에서 사용하는 이름
		},
	);

	User.associate = (db) => {
		db.User.hasMany(db.Schedule, { foreignKey: 'writer_id', sourceKey: 'id' })
		db.User.hasMany(db.Timer, { foreignKey: 'creater_id', sourceKey: 'id' })
		// db.User.hasMany(db.Post);
		// db.User.hasMany(db.Comment);
		// db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
		// db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "followingId" });
		// db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "followerId" });
	};

	return User;
};

export default User;