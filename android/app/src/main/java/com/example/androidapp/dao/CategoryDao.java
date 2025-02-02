package com.example.androidapp.dao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidapp.entities.Category;

import java.util.List;

@Dao
public interface CategoryDao {
    @Query("SELECT * FROM Category")
    List<Category> index();

//    @Query("SELECT * FROM Category WHERE _id = :id")
//    Category get(String id);

    @Insert
    void insert(Category... categories);

    @Update
    void update(Category... categories);

    @Delete
    void delete(Category... categories);

    @Query("DELETE FROM Category")
    void clear();

    @Insert
    void insertList(List<Category> categories);
}
