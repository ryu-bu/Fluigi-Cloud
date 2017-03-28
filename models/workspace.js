var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workspaceSchema = new Schema({
    name: String,
    specify_files: [],
    design_files: [],
    solution_files: [],
    other_files:[],
    created_at: Date,
    updated_at: Date
});

workspaceSchema.methods.generateFiles_and_updateSchema = function generateFiles_and_updateSchema(workspace)
{
    //var databaseInterface = require('../controllers/databaseInterface');
    var File = require('../models/file');

    var newfile = new File();

    newfile.name = 'myLFR.v';
    newfile.file_extension = '.v';

    newfile.save();

    workspace.specify_files.push(newfile._id);


    var newfile = new File();

    newfile.name = 'defaultUCF.JSON';
    newfile.file_extension = '.JSON';

    newfile.save();

    workspace.specify_files.push(newfile._id);



    var newfile = new File();

    newfile.name = 'myMINT.uf';
    newfile.file_extension = '.uf';

    newfile.save();

    workspace.design_files.push(newfile._id);


    var newfile = new File();

    newfile.name = 'defaultConfig.ini';
    newfile.file_extension = '.ini';

    newfile.save();

    workspace.design_files.push(newfile._id);


    workspace.save();

};

workspaceSchema.pre('save', function(next)
{
    this.set("_id", mongoose.Types.ObjectId(this._id), {strict: false});

    // Save date of creation
    var currentDate = new Date();       // Get the current date
    this.updated_at = currentDate;      // Change the updated_at field to current date
    if (!this.created_at)
        this.created_at = currentDate;  // If created_at doesn't exist, add to that field

    next();
});


var Workspace = mongoose.model('Workspace', workspaceSchema);
module.exports = Workspace;


/* Notes, Memos, And Deprecated Code */
/*
// var body ={body:{file_name:'myLFR.v',file_ext:'.v'}};
// databaseInterface.Create_File(body,function(file_id){
//     this.specify_files.push(file_id);
// });
// var body ={body:{file_name:'defaultUCF.JSON',file_ext:'.JSON'}};
// databaseInterface.Create_File(body,function(file_id){
//     this.specify_files.push(file_id);
// });
// var body ={body:{file_name:'myMINT.mint',file_ext:'.mint'}};
// databaseInterface.Create_File(body,function(file_id){
//     this.specify_files.push(file_id);
// });
// var body ={body:{file_name:'defaultConfig.ini',file_ext:'.ini'}};
// databaseInterface.Create_File(body,function(file_id){
//     this.specify_files.push(file_id);
// });
*/