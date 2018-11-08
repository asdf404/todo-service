module.exports = {
  up: async function (queryInterface, Sequelize) {
    // `users` table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      passhash: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    }, { charset: 'utf8' })
    await queryInterface.addIndex('users', [ 'username' ], {
      indexName: 'u_users_by_username',
      indicesType: 'UNIQUE'
    })

    // `tasks` table
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    }, { charset: 'utf8' })
    await queryInterface.addIndex('tasks', [ 'user_id' ], {
      indexName: 'i_tasks_by_user'
    })
    await queryInterface.addIndex('tasks', [ 'status' ], {
      indexName: 'i_tasks_by_status'
    })
    await queryInterface.addIndex('tasks', [ 'priority' ], {
      indexName: 'i_tasks_by_priority'
    })
  },

  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('tasks')
  }
}
