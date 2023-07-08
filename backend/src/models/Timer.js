const Timer = (sequelize, DataTypes, option) => {
	const Timer = sequelize.define(
		"Timer",
		{
			// planner: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false, //필수
			// },
			time: { // 어느 시간에 보낼지
				type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY) 
				allowNull: false,
			},
            count: { // 보내는 횟수 
                type: DataTypes.INTEGER, // DATETIME(DATE), DATE(DATEONLY) 
				allowNull: false,
            },
            count_history: { // 보낸 횟수
                type: DataTypes.INTEGER,
                allowNull: true,
            },
			created_at: {  // 생성 시간
				type: DataTypes.DATE, // DATETIME(DATE), DATE(DATEONLY)  
				allowNull: false,
				defaultValue: DataTypes.NOW,
			}
		},
		{
            ...option,
			modelName: 'Timer', // 자바스크립트에서 사용하는 이름
			tableName: 'timers', // 실제 디비에서 사용하는 이름
		},
	);

	Timer.associate = (db) => {
        db.Timer.belongsTo(db.User, { foreignKey: 'creater', targetKey: 'id', onDelete: 'cascade' })
        db.Timer.belongsTo(db.Plan, { foreignKey: 'planner', targetKey: 'id', onDelete: 'cascade' })
	};

	return Timer;
};

export default Timer;