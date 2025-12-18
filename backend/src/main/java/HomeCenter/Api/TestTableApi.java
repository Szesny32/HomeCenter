package HomeCenter.Api;

import HomeCenter.Model.TestTable;
import HomeCenter.Repository.TestTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TestTableApi {

    @Autowired
    TestTableRepository testTableRepository;

    @GetMapping("/api/testRecord/{id}")
    public TestTable findById(@PathVariable Long id) {
        return testTableRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Failed to retrieve testRecord"));
    }

    @GetMapping("/api/save/{value}")
    public TestTable save(@PathVariable String value) {
        return testTableRepository.save(value);
    }

    @GetMapping("/api/testRecords")
    public List<TestTable> findAll() {
        return testTableRepository.findAll();
    }
}
