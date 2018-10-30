const expect = require('expect');

const { Users } = require('../users');

describe('Users', () => {

    var usersObj;

    beforeEach(() => {

        usersObj = new Users();

        usersObj.users = [{
            id: '1',
            name: 'Tian',
            room: 'Pandas'
        },
        {
            id: '2',
            name: 'Mei',
            room: 'Pandas'
        },
        {
            id: '3',
            name: 'Aslan',
            room: 'Fiction'
        },
        {
            id: '4',
            name: 'Hedwig',
            room: 'Fiction'
        }]

    });

    it('should add new users', () => {

        var usersObj = new Users();

        var user = {

            id: '123',
            name: 'Pan',
            room: 'Panda'

        };

        resUser = usersObj.addUser(user.id, user.name, user.room);

        expect(usersObj.users).toEqual([user]);

    });

    it('should remove a user', () => {

        var userID = '1';

        var userToBeRemoved = usersObj.users[0];

        var user = usersObj.removeUser(userID);

        expect(user).toEqual(userToBeRemoved);

        expect(usersObj.getUser(userID)).toNotExist();

    });

    it('should not remove a user', () => {

        var userID = '99';
        var existingUsers = usersObj.users;

        var user = usersObj.removeUser(userID);

        expect(user).toNotExist();

        expect(usersObj.users).toBe(existingUsers);

    });

    it('should find user', () => {

        var userID = '3';

        var user = usersObj.getUser(userID);

        expect(user.id).toBe(userID);

    });

    it('should not find user', () => {

        var userID = '99';

        var user = usersObj.getUser(userID);

        expect(user).toNotExist();


    });

    it('should return names for room Pandas', () => {

        var userList = usersObj.getUserList('Pandas');

        expect(userList).toEqual(['Tian', 'Mei']);

    });

    it('should return names for room Fiction', () => {

        var userList = usersObj.getUserList('Fiction');

        expect(userList).toEqual(['Aslan', 'Hedwig']);

    });

});