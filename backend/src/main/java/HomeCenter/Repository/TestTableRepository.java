package HomeCenter.Repository;

import HomeCenter.Model.TestTable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Repository
public class TestTableRepository {
    @Autowired
    private NamedParameterJdbcTemplate paramTemplate;

    @Autowired
    JdbcTemplate template;

    public TestTable save(String value){
        String sql = "INSERT INTO TEST_TABLE(value) VALUES (:value)";
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("value", value);
        paramTemplate.update(sql, namedParameters);
        return findByValue(value).orElseThrow(() ->
                new RuntimeException("Failed to retrieve the newly inserted category"));
    }

    public Optional<TestTable> findByValue(String value) {
        String sql = "SELECT * FROM TEST_TABLE WHERE value = :value";
        SqlParameterSource namedParameters = new MapSqlParameterSource("value", value);
        RowMapper<TestTable> mapper = (ResultSet rs, int rowNum) -> {
            TestTable testRecord = new TestTable();
            testRecord.setId(rs.getLong("id"));
            testRecord.setValue(rs.getString("value"));
            return testRecord;
        };
        try {
            return Optional.ofNullable(paramTemplate.queryForObject(sql, namedParameters, mapper));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public Optional<TestTable> findById(Long id) {
        String sql = "SELECT * FROM TEST_TABLE WHERE id = :id";
        SqlParameterSource namedParameters = new MapSqlParameterSource("id", id);
        RowMapper<TestTable> mapper = (ResultSet rs, int rowNum) -> {
            TestTable testRecord = new TestTable();
            testRecord.setId(rs.getLong("id"));
            testRecord.setValue(rs.getString("value"));
            return testRecord;
        };
        try {
            return Optional.ofNullable(paramTemplate.queryForObject(sql, namedParameters, mapper));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<TestTable> findAll() {
        String sql = "SELECT * FROM TEST_TABLE";
        RowMapper<TestTable> mapper = (ResultSet rs, int rowNum) -> {
            TestTable testRecord = new TestTable();
            testRecord.setId(rs.getLong("id"));
            testRecord.setValue(rs.getString("value"));
            return testRecord;
        };
        return template.query(sql, mapper);
    }

}
